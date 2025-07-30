using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TodoApi.Services
{
    public class OpenAiSummaryService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private readonly Dictionary<string, (int percentScore, string summary)> _cachedResults = new();
        private readonly Dictionary<string, DateTime> _lastFetchTimes = new();
        private readonly TimeSpan _fetchTime = new TimeSpan(8, 0, 0); // 8:00 AM

        public OpenAiSummaryService(string apiKey)
        {
            _apiKey = apiKey;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        }

        public async Task<(int percentScore, string summary)> GetScoreAndSummaryAsync(string category, Dictionary<string, (double? current, double? monthAgo, double? yearAgo)> indicatorValues)
        {
            var now = DateTime.Now;
            var todayFetchTime = now.Date + _fetchTime;
            _lastFetchTimes.TryGetValue(category, out var lastFetchTime);
            bool shouldFetch = lastFetchTime < todayFetchTime && now >= todayFetchTime;
            if (_cachedResults.ContainsKey(category) && !shouldFetch)
            {
                return _cachedResults[category];
            }

            var indicatorDescriptions = indicatorValues.Select(kv =>
                $"{kv.Key}: Current={kv.Value.current?.ToString("F1") ?? "N/A"}, 1 Year Ago={kv.Value.yearAgo?.ToString("F1") ?? "N/A"}");
            var prompt = $"Given these indicator values for the '{category}' category, showing the current value (on the date {DateTime.Today}) and the value 1 year ago: {string.Join(", ", indicatorDescriptions)}. First, provide a single integer percent score (0-100) representing the overall outlook for this category, then provide 3 longer, expertly written paragraphs summarizing the outlook using insights from the data provided as well as your training data for the same indicators. IMPORTANT: If any values were null or look weird (like staying completely constant through time) or anything else seems off, indicate which ones and their dates and the problem in a fourth paragraph. Format your response as: 'Score: <number>\nSummary: <paragraph 1>\n<paragraph 2>\n<paragraph 3>\n<optional fourth paragraph indicating errors>'.";
            var requestBody = new
            {
                model = "o4-mini",
                messages = new[] {
                    new { role = "system", content = "You are an expert economic analyst. Your goal is to make economics understandable for anyone no matter their background/education and the way you talk reflects that." },
                    new { role = "user", content = prompt }
                }
            };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseBody);
            var message = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
            int percentScore = 0;
            string summary = "No summary available.";
            if (message != null)
            {
                var lines = message.Split('\n');
                bool summaryStarted = false;
                var summaryLines = new List<string>();
                foreach (var line in lines)
                {
                    if (line.StartsWith("Score:", StringComparison.OrdinalIgnoreCase))
                    {
                        var scoreStr = line.Substring(6).Trim();
                        int.TryParse(scoreStr, out percentScore);
                    }
                    else if (line.StartsWith("Summary:", StringComparison.OrdinalIgnoreCase))
                    {
                        summaryStarted = true;
                        var firstSummary = line.Substring(8).Trim();
                        if (!string.IsNullOrEmpty(firstSummary))
                            summaryLines.Add(firstSummary);
                    }
                    else if (summaryStarted)
                    {
                        if (!string.IsNullOrWhiteSpace(line))
                            summaryLines.Add(line.Trim());
                    }
                }
                if (summaryLines.Count > 0)
                    summary = string.Join("\n", summaryLines);
            }
            _cachedResults[category] = (percentScore, summary);
            _lastFetchTimes[category] = now;
            return (percentScore, summary);
        }
    }
}
