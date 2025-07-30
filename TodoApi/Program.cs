using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Services;
using Microsoft.Extensions.Caching.Memory;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CrashCompassContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpClient<FredService>();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton(new CacheSettings());
builder.Services.AddScoped<FredService>(sp =>
{
    var httpClient = sp.GetRequiredService<IHttpClientFactory>().CreateClient();
    var config = sp.GetRequiredService<IConfiguration>();
    var cache = sp.GetRequiredService<IMemoryCache>();
    var cacheSettings = sp.GetRequiredService<CacheSettings>();
    return new FredService(httpClient, config, cache, cacheSettings);
});

// Register OpenAiSummaryService with API key from config
builder.Services.AddSingleton<OpenAiSummaryService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var apiKey = config["OpenAi:ApiKey"];
    return new OpenAiSummaryService(apiKey);
});

builder.Services.AddScoped<IDialCalculator, DialCalculator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://192.168.86.42:3000",
                "https://crash-compass.vercel.app/"
                )
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddScoped<OutlookController>(sp =>
{
    var dialCalculator = sp.GetRequiredService<IDialCalculator>();
    var openAi = sp.GetRequiredService<OpenAiSummaryService>();
    var fred = sp.GetRequiredService<FredService>();
    return new OutlookController(dialCalculator, openAi, fred);
});


var app = builder.Build();

app.UseCors("AllowNextJs");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
