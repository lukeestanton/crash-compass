using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using CrashCompassBack.Models;
using CrashCompassBack.Services;

namespace CrashCompassBack.Controllers
{
    [ApiController]
    [Route("api/chart")]
    public class ChartController : ControllerBase
    {
        private readonly FredService _fred;

        public ChartController(FredService fred) => _fred = fred;

        [HttpGet("{chartName}")]
        public async Task<IActionResult> GetLatest(string chartName)
        {
            try
            {
                var value = await _fred.GetLatestAsync(chartName.ToLower());
                return value is null ? NotFound()
                                     : Ok(new { chartName, value });
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

        [HttpGet("{chartName}/history")]
        public async Task<IActionResult> GetHistory(
            string chartName,
            [FromQuery] int? months = null,
            [FromQuery] int? years = null,
            [FromQuery] DateTime? start = null,
            [FromQuery] DateTime? end = null)
        {
            if (!ChartDefinitions.SeriesMap.TryGetValue(chartName.ToLower(), out var seriesId))
                return NotFound();

            var rangeEnd = end ?? DateTime.Today;
            var rangeStart = start
                             ?? (months.HasValue ? rangeEnd.AddMonths(-months.Value)
                             : years.HasValue ? rangeEnd.AddYears(-years.Value)
                             : rangeEnd.AddMonths(-12));

            var raw = await _fred.FetchObservationsAsync(seriesId, rangeStart, rangeEnd);
            var points = FredService.ToChartData(raw);
            return Ok(points);
        }

    }

}
