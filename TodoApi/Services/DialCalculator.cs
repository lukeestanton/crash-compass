using TodoApi.Services;

public class DialCalculator : IDialCalculator
{
    private readonly FredService _fred;

    public DialCalculator(FredService fred) => _fred = fred;

    private static double ScoreYieldCurve(double? v) => v switch
    {
        null => 50,
        >= 0 => 20,
        <= -0.25 => 85,
        _ => 20 + (-v.Value / 0.25) * 65
    };

    private static double ScoreInitialClaims(double? v) => RangeScoreLowGood(v, 250_000, 300_000);
    private static double ScoreUnemployment(double? v) => RangeScoreLowGood(v, 4.0, 5.0);
    private static double ScoreConsumerSent(double? v) => RangeScoreHighGood(v, 70, 90);
    private static double ScoreRetailSalesYoY(double? v) => RangeScoreHighGood(v, 0, 3);
    private static double ScorePayrolls(double? v) => RangeScoreHighGood(v, 150_000, 160_000);
    private static double ScoreManufHours(double? v) => RangeScoreHighGood(v, 38, 41);
    private static double ScoreRealPCE(double? v) => RangeScoreHighGood(v, 14_500, 15_300);
    private static double ScoreSavingRate(double? v) => RangeScoreHighGood(v, 2, 8);
    private static double ScoreSTLStress(double? v) => RangeScoreLowGood(v, 0.0, 1.5);
    private static double ScoreHighYieldSpread(double? v) => RangeScoreLowGood(v, 400, 900);
    private static double ScoreNFCI(double? v) => RangeScoreLowGood(v, 0.0, 0.4);
    private static double ScoreIndProd(double? v) => RangeScoreHighGood(v, 100, 105);
    private static double ScoreCapacityUtil(double? v) => RangeScoreHighGood(v, 70, 78);
    private static double ScoreDurGoods(double? v) => RangeScoreHighGood(v, 270_000, 290_000);
    private static double ScoreNewOrders(double? v) => RangeScoreHighGood(v, 500_000, 550_000);


    private static double RangeScoreLowGood(double? v, double lowGood, double highBad)
    {
        if (!v.HasValue) return 50;
        if (v.Value <= lowGood) return 15;
        if (v.Value >= highBad) return 85;
        return 15 + ((v.Value - lowGood) / (highBad - lowGood)) * 70;
    }

    private static double RangeScoreHighGood(double? v, double lowBad, double highGood)
    {
        if (!v.HasValue) return 50;
        if (v.Value >= highGood) return 15;
        if (v.Value <= lowBad) return 85;
        return 85 - ((v.Value - lowBad) / (highGood - lowBad)) * 70;
    }

    private static readonly Dictionary<string, Func<double?, double>> _scorers = new()
    {
        // Labor
        ["unemployment"] = ScoreUnemployment,
        ["initialclaims"] = ScoreInitialClaims,
        ["payems"] = ScorePayrolls,
        ["awhman"] = ScoreManufHours,

        // Consumers
        ["consumersentiment"] = ScoreConsumerSent,
        ["retailsales"] = ScoreRetailSalesYoY,
        ["pcec96"] = ScoreRealPCE,
        ["psavert"] = ScoreSavingRate,

        // Financial conditions
        ["yieldcurve"] = ScoreYieldCurve,
        ["stlfsi4"] = ScoreSTLStress,
        ["bamlh0a0hym2"] = ScoreHighYieldSpread,
        ["nfci"] = ScoreNFCI,

        // Production
        ["indpro"] = ScoreIndProd,
        ["tcu"] = ScoreCapacityUtil,
        ["dgorder"] = ScoreDurGoods,
        ["neworder"] = ScoreNewOrders,
    };

    private static readonly Dictionary<string, string[]> _buckets = new()
    {
        ["labor"] = new[] { "unemployment", "initialclaims", "payems", "awhman" },
        ["consumer"] = new[] { "consumersentiment", "retailsales", "pcec96", "psavert" },
        ["financial"] = new[] { "yieldcurve", "stlfsi4", "bamlh0a0hym2", "nfci" },
        ["production"] = new[] { "indpro", "tcu", "dgorder", "neworder" }
    };

    // Each bucket gets equal weight (0.25).  Adjust if you want custom weights.
    public async Task<DialResult> GetCurrentScoreAsync()
    {
        // 1) fetch everything in parallel
        var valueTasks = _scorers.Keys.ToDictionary(k => k, k => _fred.GetLatestAsync(k));
        await Task.WhenAll(valueTasks.Values);

        // 2) score every indicator
        var scores = valueTasks.ToDictionary(
            kvp => kvp.Key,
            kvp => _scorers[kvp.Key](kvp.Value.Result)
        );

        // 3) bucket averages → composite
        double BucketAvg(string[] keys) => keys.Select(k => scores[k]).Average();

        double composite = _buckets.Values.Select(BucketAvg).Average();

        return new DialResult(Math.Round(composite, 1), DateTime.UtcNow);
    }

    public static Dictionary<string, string[]> Buckets => _buckets;

    public async Task<Dictionary<string, double>> GetCurrentScoresAsync()
    {
        var valueTasks = _scorers.Keys.ToDictionary(k => k, k => _fred.GetLatestAsync(k));
        await Task.WhenAll(valueTasks.Values);
        var scores = valueTasks.ToDictionary(
            kvp => kvp.Key,
            kvp => _scorers[kvp.Key](kvp.Value.Result)
        );
        return scores;
    }
}
