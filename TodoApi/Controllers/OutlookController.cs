using Microsoft.AspNetCore.Mvc;
using TodoApi.Services;
using TodoApi.Models; // Add this to access ChartDefinitions

[ApiController]
[Route("api/outlook")]
public class OutlookController : ControllerBase
{
    private readonly IDialCalculator _dialCalculator;
    private readonly OpenAiSummaryService _openAi;
    private readonly FredService _fred;

    public OutlookController(IDialCalculator dialCalculator, OpenAiSummaryService openAi, FredService fred)
    {
        _dialCalculator = dialCalculator;
        _openAi = openAi;
        _fred = fred;
    }

    [HttpGet("{category}")]
    public async Task<IActionResult> GetOutlook(string category)
    {
        // Validate category
        if (!DialCalculator.Buckets.ContainsKey(category))
            return NotFound();

        // Get raw FRED values for this bucket
        var bucketKeys = DialCalculator.Buckets[category];
        var indicatorValues = new Dictionary<string, (double? current, double? monthAgo, double? yearAgo)>();
        foreach (var key in bucketKeys)
        {
            var seriesId = ChartDefinitions.SeriesMap[key];
            var values = await _fred.GetIndicatorValuesAsync(seriesId);
            indicatorValues[key] = values;
        }
        // Remove indicators with no current value
        var nonNullIndicatorValues = indicatorValues.Where(kv => kv.Value.current.HasValue)
                                                    .ToDictionary(kv => kv.Key, kv => kv.Value);

        // Get percent score and summary from OpenAI
        var (percentScore, summary) = await _openAi.GetScoreAndSummaryAsync(category, nonNullIndicatorValues);

        return Ok(new
        {
            percentScore,
            summary
        });
    }
}