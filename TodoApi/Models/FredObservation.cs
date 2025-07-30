using System;

namespace TodoApi.Models;

public class FredObservation
{
    public string date { get; set; } = "";
    public string value { get; set; } = "";
}

public class FredObservationsResponse
{
    public List<FredObservation> observations { get; set; } = new();
}

public class ChartDataPoint
{
    public string date { get; set; } = "";
    public double value { get; set; }
}
