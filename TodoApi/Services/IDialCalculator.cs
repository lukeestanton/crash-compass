namespace TodoApi.Services;

public interface IDialCalculator
{
    Task<DialResult> GetCurrentScoreAsync();
    Task<Dictionary<string, double>> GetCurrentScoresAsync();
}

public record DialResult(double Score, DateTime UpdatedUtc);