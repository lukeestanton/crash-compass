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
        ["emratio"] = "EMRATIO",
        ["temphelps"] = "TEMPHELPS",
        ["ccsa"] = "CCSA",

        // Consumers
        ["consumersentiment"] = "UMCSENT",
        ["retailsales"] = "RSAFSNA",
        ["pcec96"] = "PCEC96",
        ["psavert"] = "PSAVERT",
        ["totalsl"] = "TOTALSL",
        ["pi"] = "PI",

        // Financial Conditions
        ["yieldcurve"] = "T10Y3M",
        ["stlfsi4"] = "STLFSI4",
        ["bamlh0a0hym2"] = "BAMLH0A0HYM2",
        ["nfci"] = "NFCI",
        ["vixcls"] = "VIXCLS",
        ["anfci"] = "ANFCI",
        ["sp500"] = "SP500",

        // Production
        ["indpro"] = "INDPRO",
        ["tcu"] = "TCU",
        ["dgorder"] = "DGORDER",
        ["neworder"] = "NEWORDER",
        ["mnfctrirsa"] = "MNFCTRIRSA",
        ["ipbuseq"] = "IPBUSEQ",

        // Housing
        ["houst"] = "HOUST",
        ["hsn1f"] = "HSN1F",
        ["permit"] = "PERMIT",
        ["msacsr"] = "MSACSR",
        ["mortgage30us"] = "MORTGAGE30US",
        ["csushpinsa"] = "CSUSHPINSA",
        ["exhoslusm495s"] = "EXHOSLUSM495S",
    };
}
