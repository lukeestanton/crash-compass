using System;

namespace TodoApi.Models;

public static class ChartDefinitions
{
    public static readonly Dictionary<string, string> SeriesMap = new()
    {
        // Recession Data
        ["usrec"] = "USREC",
        
        // Labor
        ["unemployment"] = "UNRATE",
        ["initialclaims"] = "ICSA",
        ["payems"] = "PAYEMS",
        ["awhman"] = "AWHMAN",
        ["jtsjol"] = "JTSJOL",

        // Consumers
        ["consumersentiment"] = "UMCSENT",
        ["retailsales"] = "RSAFSNA",
        ["pcec96"] = "PCEC96",
        ["psavert"] = "PSAVERT",

        // Financial Conditions
        ["yieldcurve"] = "T10Y3M",
        ["stlfsi4"] = "STLFSI4",
        ["bamlh0a0hym2"] = "BAMLH0A0HYM2",
        ["nfci"] = "NFCI",

        // Production
        ["indpro"] = "INDPRO",
        ["tcu"] = "TCU",
        ["dgorder"] = "DGORDER",
        ["neworder"] = "NEWORDER",

        // Housing
    };
}
