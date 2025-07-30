using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using TodoApi.Models;
using System.Collections.Concurrent;

public class FredService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;
    private readonly CacheSettings _cacheSettings;
    private readonly string _apiKey;
    private const string FredBaseUrl = "https://api.stlouisfed.org/fred/";

    private static readonly ConcurrentDictionary<string, List<DateTime>> _rateLimitTracker = new();
    private const int RateLimitCount = 50;
    private static readonly TimeSpan RateLimitWindow = TimeSpan.FromMinutes(1);

    public FredService(HttpClient httpClient, IConfiguration config, IMemoryCache cache, CacheSettings cacheSettings)
    {
        _httpClient = httpClient;
        _cache = cache;
        _cacheSettings = cacheSettings;

        var apiKey = config["Fred:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("FRED API key is missing from configuration.");

        _apiKey = apiKey;
    }

    private static DateTime GetNext8AmET()
    {
        var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
        var nowUtc = DateTime.UtcNow;
        var nowET = TimeZoneInfo.ConvertTimeFromUtc(nowUtc, easternZone);
        var next8Am = nowET.Date.AddHours(8);
        if (nowET >= next8Am)
            next8Am = next8Am.AddDays(1);
        return TimeZoneInfo.ConvertTimeToUtc(next8Am, easternZone);
    }

    private static void CheckRateLimit(string key)
    {
        var now = DateTime.UtcNow;
        var list = _rateLimitTracker.GetOrAdd(key, _ => new List<DateTime>());
        lock (list)
        {
            list.RemoveAll(dt => dt < now - RateLimitWindow);
            if (list.Count >= RateLimitCount)
                throw new InvalidOperationException($"Rate limit exceeded for {key}. Try again later.");
            list.Add(now);
        }
    }

    public async Task<FredObservationsResponse?> FetchObservationsAsync(string seriesId, DateTime? start = null, DateTime? end = null)
    {
        CheckRateLimit(seriesId);

        var cacheKey = $"fred_obs:{seriesId}:{start?.ToString("yyyy-MM-dd") ?? ""}:{end?.ToString("yyyy-MM-dd") ?? ""}";
        if (_cache.TryGetValue(cacheKey, out var cached) && cached is FredObservationsResponse cachedResponse)
            return cachedResponse;

        var url = $"{FredBaseUrl}series/observations" +
                  $"?series_id={seriesId}" +
                  $"&api_key={_apiKey}" +
                  $"&file_type=json";

        if (start.HasValue)
            url += $"&observation_start={start:yyyy-MM-dd}";
        if (end.HasValue)
            url += $"&observation_end={end:yyyy-MM-dd}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<FredObservationsResponse>(json);
        var expiration = GetNext8AmET();
        _cache.Set(cacheKey, result, expiration - DateTime.UtcNow);
        return result;
    }

    public static double? GetLatestValue(FredObservationsResponse? data)
    {
        var latest = data?.observations?
            .Where(o => double.TryParse(o.value, out _))
            .LastOrDefault();

        if (latest != null && double.TryParse(latest.value, out var value))
            return value;
        return null;
    }

    public static List<ChartDataPoint> ToChartData(FredObservationsResponse? data)
    {
        return data?.observations
            .Where(o => double.TryParse(o.value, out _))
            .Select(o => new ChartDataPoint
            {
                date = o.date,
                value = double.Parse(o.value)
            })
            .ToList() ?? new List<ChartDataPoint>();
    }

    public async Task<double?> GetLatestAsync(string key)
    {
        if (!ChartDefinitions.SeriesMap.TryGetValue(key, out var seriesId))
            throw new ArgumentException($"Unknown series key: {key}", nameof(key));
        CheckRateLimit(seriesId);
        var cacheKey = $"fred_latest:{key}";
        if (_cache.TryGetValue(cacheKey, out var cachedValue) && cachedValue is double value)
            return value;
        var latestValue = GetLatestValue(await FetchObservationsAsync(seriesId));
        if (latestValue.HasValue)
        {
            var expiration = GetNext8AmET();
            _cache.Set(cacheKey, latestValue.Value, expiration - DateTime.UtcNow);
        }
        return latestValue;
    }

    public async Task<(double? current, double? monthAgo, double? yearAgo)> GetIndicatorValuesAsync(string seriesId)
    {
        var now = DateTime.UtcNow.Date;
        var oneMonthAgo = now.AddMonths(-1);
        var oneYearAgo = now.AddYears(-1);
        var data = await FetchObservationsAsync(seriesId, oneYearAgo, now);
        double? current = null, monthAgo = null, yearAgo = null;
        if (data?.observations != null)
        {
            // Get closest values to the target dates
            current = data.observations
                .Where(o => double.TryParse(o.value, out _))
                .OrderByDescending(o => o.date)
                .Select(o => double.Parse(o.value))
                .FirstOrDefault();
            monthAgo = data.observations
                .Where(o => double.TryParse(o.value, out _) && DateTime.TryParse(o.date, out var d) && d <= oneMonthAgo)
                .OrderByDescending(o => DateTime.Parse(o.date))
                .Select(o => double.Parse(o.value))
                .FirstOrDefault();
            yearAgo = data.observations
                .Where(o => double.TryParse(o.value, out _) && DateTime.TryParse(o.date, out var d) && d <= oneYearAgo)
                .OrderByDescending(o => DateTime.Parse(o.date))
                .Select(o => double.Parse(o.value))
                .FirstOrDefault();
        }
        return (current, monthAgo, yearAgo);
    }
}



