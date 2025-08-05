import { LineChartCardProps } from "../components/LineChartCard";

export interface ChartDefinition {
    title: string;
    blurb: string;
    category: string;
    chartProps: LineChartCardProps;
    featured?: boolean;
}

export const allCharts: ChartDefinition[] = [
    // Consumer Charts
    {
        title: "Consumer Sentiment",
        blurb: "Measures how optimistic or pessimistic people feel about their personal finances and the economy overall. When sentiment drops, it often means people are worried and may spend less.",
        category: "consumer",
        chartProps: {
            chartName: "consumersentiment",
            title: "Consumer Sentiment",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Consumer Sentiment"],
            citation: "University of Michigan Consumer Sentiment Survey, FRED Economic Data",
        },
        featured: true,
    },
    {
        title: "Retail Sales",
        blurb: "Tracks how much people are spending in stores and online. Growing sales usually mean people feel confident about their finances, while falling sales can be an early warning sign of economic trouble.",
        category: "consumer",
        chartProps: {
            chartName: "retailsales",
            title: "Retail Sales",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Retail Sales"],
            citation: "U.S. Census Bureau, Advance Monthly Sales for Retail and Food Services, FRED Economic Data",
        },
        featured: true,
    },
    {
        title: "Personal Consumption Expenditures",
        blurb: "Measures the value of goods and services purchased by U.S. households. Growth in PCE signals rising consumer spending, a key driver of economic activity.",
        category: "consumer",
        chartProps: {
            chartName: "pcec96",
            title: "Personal Consumption Expenditures ($ Billions)",
            range: { years: 10 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "PCE ($ Billions)"],
            citation: "U.S. Bureau of Economic Analysis, Personal Income and Outlays, FRED Economic Data",
        },
    },
    {
        title: "Personal Saving Rate",
        blurb: "Shows the percentage of disposable income that U.S. households save each month. A rising saving rate can signal caution or uncertainty among consumers, while a falling rate may indicate increased spending.",
        category: "consumer",
        chartProps: {
            chartName: "psavert",
            title: "Personal Saving Rate (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "Saving Rate"],
            citation: "U.S. Bureau of Economic Analysis, Personal Income and Outlays, FRED Economic Data",
        },
    },
    {
        title: "Consumer Credit Outstanding",
        blurb: "Significant declines or sharp contractions indicate consumers becoming cautious, reducing spending and borrowing, signaling weakening demand.",
        category: "consumer",
        chartProps: {
            chartName: "totalsl",
            title: "Consumer Credit Outstanding (Billions $)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Consumer Credit (Billions $)"],
            citation: "Federal Reserve Board, Consumer Credit, FRED Economic Data",
        },
    },
    {
        title: "Personal Income",
        blurb: "Stagnation or declining personal income constrains consumer spending, weakening aggregate demand and often indicating recessionary pressures.",
        category: "consumer",
        chartProps: {
            chartName: "pi",
            title: "Personal Income (Billions $)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Personal Income (Billions $)"],
            citation: "U.S. Bureau of Economic Analysis, Personal Income and Outlays, FRED Economic Data",
        },
    },

    // Labor Market Charts
    {
        title: "Unemployment Rate",
        blurb: "Shows the share of people who are looking for work but can't find it—when this number climbs, it's often an early sign the economy is starting to slow.",
        category: "labor",
        chartProps: {
            chartName: "unemployment",
            title: "Unemployment Rate (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "Unemployment Rate"],
            citation: "U.S. Bureau of Labor Statistics, Current Population Survey, FRED Economic Data",
        },
    },
    {
        title: "Initial Jobless Claims",
        blurb: "Tracks new filings for unemployment benefits. Rising claims can signal trouble in the labor market before it shows up in the unemployment rate.",
        category: "labor",
        chartProps: {
            chartName: "initialclaims",
            title: "Initial Jobless Claims (Thousands)",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Jobless Claims (Thousands)"],
            citation: "U.S. Employment and Training Administration, Unemployment Insurance Weekly Claims Report, FRED Economic Data",
        },
    },
    {
        title: "All Employees, Total Nonfarm",
        blurb: "Measures the total number of paid U.S. workers in all nonfarm industries. Increases signal job growth, while declines may signal economic trouble.",
        category: "labor",
        chartProps: {
            chartName: "payems",
            title: "Total Nonfarm Employment (Thousands)",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Employment (Thousands)"],
            citation: "U.S. Bureau of Labor Statistics, Current Employment Statistics, FRED Economic Data",
        },
    },
    {
        title: "Average Weekly Hours, Manufacturing",
        blurb: "Tracks the average weekly hours worked by production and nonsupervisory employees in manufacturing. Changes can signal shifts in demand, hiring, or overtime trends.",
        category: "labor",
        chartProps: {
            chartName: "awhman",
            title: "Manufacturing Weekly Hours",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Hours per Week"],
            citation: "U.S. Bureau of Labor Statistics, Current Employment Statistics, FRED Economic Data",
        },
    },
    {
        title: "Job Openings",
        blurb: "Tracks the number of job openings in the U.S. economy. Rising job openings can signal a strong labor market, while falling job openings can signal economic trouble.",
        category: "labor",
        chartProps: {
            chartName: "jtsjol",
            title: "Job Openings (Thousands)",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Job Openings (Thousands)"],
            citation: "U.S. Bureau of Labor Statistics, Job Openings and Labor Turnover Survey, FRED Economic Data",
        },
    },
    {
        title: "Employment-Population Ratio",
        blurb: "A falling employment-to-population ratio indicates weakening labor market participation, often reflecting deeper economic distress than unemployment alone.",
        category: "labor",
        chartProps: {
            chartName: "emratio",
            title: "Employment-Population Ratio (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "Employment-Population Ratio"],
            citation: "U.S. Bureau of Labor Statistics, Current Population Survey, FRED Economic Data",
        },
    },

    // Production Charts
    {
        title: "Industrial Production – YoY %",
        blurb: "Tracks the year-over-year change in physical output from factories, mines, and utilities. Persistent declines are a classic sign that the real economy is contracting.",
        category: "production",
        chartProps: {
            chartName: "indpro",
            title: "Industrial Production (YoY % Change)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "YoY % Change"],
            citation: "Federal Reserve Board, Industrial Production and Capacity Utilization, FRED Economic Data",
        },
    },
    {
        title: "Capacity Utilization – Total Industry",
        blurb: "Shows how much of America's industrial plant is in use. Falling utilization signals slack demand and typically precedes layoffs and cutbacks.",
        category: "production",
        chartProps: {
            chartName: "tcu",
            title: "Capacity Utilization Rate (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "Capacity Utilization"],
            citation: "Federal Reserve Board, Industrial Production and Capacity Utilization, FRED Economic Data",
        },
    },
    {
        title: "Durable-Goods New Orders",
        blurb: "Headline factory orders for long-lived goods—from appliances to aircraft. A sustained slide often foreshadows cutbacks in production and hiring.",
        category: "production",
        chartProps: {
            chartName: "dgorder",
            title: "Durable Goods Orders (Millions $)",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (n: number) => n.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Orders (Millions $)"],
            citation: "U.S. Census Bureau, Manufacturers' Shipments, Inventories, and Orders, FRED Economic Data",
        },
    },
    {
        title: "Core Capital-Goods Orders",
        blurb: "Non-defense capital goods excluding aircraft. Economists use it as a clean read on business investment plans.",
        category: "production",
        chartProps: {
            chartName: "neworder",
            title: "Core Capital Goods Orders (Millions $)",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (n: number) => n.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Orders (Millions $)"],
            citation: "U.S. Census Bureau, Manufacturers' Shipments, Inventories, and Orders, FRED Economic Data",
        },
    },
    {
        title: "Manufacturers' Inventories-to-Sales Ratio",
        blurb: "Rising inventories relative to sales suggest weakened demand, prompting future production cuts and often preceding recessions.",
        category: "production",
        chartProps: {
            chartName: "mnfctrirsa",
            title: "Manufacturers' Inventories-to-Sales Ratio",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "Inventories-to-Sales Ratio"],
            citation: "U.S. Census Bureau, Manufacturers' Shipments, Inventories, and Orders, FRED Economic Data",
        },
    },


    // Financial Conditions Charts
    {
        title: "Yield Curve",
        blurb: "Shows the difference between short-term and long-term interest rates. When the yield curve 'inverts'—meaning short-term rates are higher than long-term rates—it's often a signal that a recession could be on the way.",
        category: "financial",
        chartProps: {
            chartName: "yieldcurve",
            title: "10-Year Minus 3-Month Treasury Rate (%)",
            range: { months: 6 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Yield Spread (%)"],
            citation: "Federal Reserve Board, Selected Interest Rates, FRED Economic Data",
        },
    },
    {
        title: "St. Louis Financial Stress Index",
        blurb: "Measures the degree of financial stress in U.S. markets, based on indicators like interest rates, yield spreads, and asset prices. Higher values indicate greater stress in the financial system.",
        category: "financial",
        chartProps: {
            chartName: "stlfsi4",
            title: "St. Louis Financial Stress Index",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "Stress Index"],
            citation: "Federal Reserve Bank of St. Louis, Financial Stress Index, FRED Economic Data",
        },
    },
    {
        title: "High-Yield Corporate Bond Spread",
        blurb: "Tracks the extra yield investors demand to hold junk-rated bonds versus Treasuries. When this 'risk-premium' widens, credit is tightening and recession odds climb.",
        category: "financial",
        chartProps: {
            chartName: "bamlh0a0hym2",
            title: "High-Yield Corporate Bond Spread (%)",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`, "Bond Spread (%)"],
            citation: "Bank of America Merrill Lynch, High Yield Master II OAS, FRED Economic Data",
        },
    },
    {
        title: "Chicago Fed National Financial Conditions Index",
        blurb: "A weekly composite of 105 market prices, credit spreads, and leverage ratios. Positive values = tighter than average conditions; negatives = easier.",
        category: "financial",
        chartProps: {
            chartName: "nfci",
            title: "Chicago Fed National Financial Conditions Index",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "NFCI Index"],
            citation: "Federal Reserve Bank of Chicago, National Financial Conditions Index, FRED Economic Data",
        },
    },

    {
        title: "VIX Volatility Index",
        blurb: "A sharp rise in the VIX indicates market uncertainty and investor anxiety, often correlated with recessions and economic downturns.",
        category: "financial",
        chartProps: {
            chartName: "vixcls",
            title: "VIX Volatility Index",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Day: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "VIX Index"],
            citation: "Chicago Board Options Exchange, CBOE Volatility Index, FRED Economic Data",
        },
    },

    // Housing Charts
    {
        title: "Housing Starts",
        blurb: "Declining housing starts signal reduced construction activity due to weakening economic expectations, a leading indicator historically preceding recessions.",
        category: "housing",
        chartProps: {
            chartName: "houst",
            title: "Housing Starts (Thousands)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Housing Starts (Thousands)"],
            citation: "U.S. Census Bureau, New Residential Construction, FRED Economic Data",
        },
    },
    {
        title: "New Home Sales",
        blurb: "Drops in new home sales reflect reduced consumer confidence and economic pessimism, reliably preceding recessionary periods.",
        category: "housing",
        chartProps: {
            chartName: "hsn1f",
            title: "New Home Sales (Thousands)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "New Home Sales (Thousands)"],
            citation: "U.S. Census Bureau, New Residential Sales, FRED Economic Data",
        },
    },

    // Additional Labor Market Charts
    {
        title: "Temporary Help Services Employment",
        blurb: "Temporary employment often leads permanent employment trends. Declines signal businesses becoming cautious about hiring, a leading indicator of labor market weakness.",
        category: "labor",
        chartProps: {
            chartName: "temphelps",
            title: "Temporary Help Services Employment (Thousands)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Temporary Employment (Thousands)"],
            citation: "U.S. Bureau of Labor Statistics, Current Employment Statistics, FRED Economic Data",
        },
    },

    {
        title: "Continued Claims",
        blurb: "Tracks the number of people continuing to receive unemployment benefits. Rising continued claims indicate difficulty finding new employment.",
        category: "labor",
        chartProps: {
            chartName: "ccsa",
            title: "Continued Claims (Thousands)",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Continued Claims (Thousands)"],
            citation: "U.S. Employment and Training Administration, Unemployment Insurance Weekly Claims Report, FRED Economic Data",
        },
    },

    // Additional Production Charts
    {
        title: "Industrial Production: Business Equipment",
        blurb: "Measures output of business equipment, a key indicator of business investment and capital spending trends.",
        category: "production",
        chartProps: {
            chartName: "ipbuseq",
            title: "Industrial Production: Business Equipment (Index)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 1 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 1 }), "Business Equipment Index"],
            citation: "Federal Reserve Board, Industrial Production and Capacity Utilization, FRED Economic Data",
        },
    },

    // Additional Financial Conditions Charts
    {
        title: "Chicago Fed Adjusted NFCI",
        blurb: "The adjusted version of the National Financial Conditions Index, which removes the average level of financial stress to focus on deviations from normal conditions.",
        category: "financial",
        chartProps: {
            chartName: "anfci",
            title: "Chicago Fed Adjusted NFCI",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "Adjusted NFCI"],
            citation: "Federal Reserve Bank of Chicago, National Financial Conditions Index, FRED Economic Data",
        },
    },
    {
        title: "S&P 500 Index",
        blurb: "The S&P 500 tracks 500 large-cap U.S. stocks. Sharp declines often signal economic uncertainty and can precede recessions.",
        category: "financial",
        chartProps: {
            chartName: "sp500",
            title: "S&P 500 Index",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 0 }),
            tooltipLabelFormatter: (l: string) => `Day: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 0 }), "S&P 500"],
            citation: "S&P Dow Jones Indices LLC, S&P 500, FRED Economic Data",
        },
    },

    // Additional Housing Charts
    {
        title: "Building Permits",
        blurb: "Building permits are a leading indicator of future construction activity. Declining permits signal reduced construction plans and economic caution.",
        category: "housing",
        chartProps: {
            chartName: "permit",
            title: "Building Permits (Thousands)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Building Permits (Thousands)"],
            citation: "U.S. Census Bureau, New Residential Construction, FRED Economic Data",
        },
    },
    {
        title: "Months' Supply of New Houses",
        blurb: "Measures how long it would take to sell all new houses at the current sales rate. Rising supply indicates weakening demand and potential price pressure.",
        category: "housing",
        chartProps: {
            chartName: "msacsr",
            title: "Months' Supply of New Houses",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 1 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 1 }), "Months' Supply"],
            citation: "U.S. Census Bureau, New Residential Sales, FRED Economic Data",
        },
    },
    {
        title: "30-Year Fixed Mortgage Rate",
        blurb: "The average interest rate on 30-year fixed-rate mortgages. Higher rates can dampen housing demand and economic activity.",
        category: "housing",
        chartProps: {
            chartName: "mortgage30us",
            title: "30-Year Fixed Mortgage Rate (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`, "Mortgage Rate"],
            citation: "Freddie Mac, Primary Mortgage Market Survey, FRED Economic Data",
        },
    },

    {
        title: "S&P/Case-Shiller U.S. National Home Price Index",
        blurb: "Tracks changes in the value of residential real estate. Declining home prices can signal economic weakness and reduce consumer wealth.",
        category: "housing",
        chartProps: {
            chartName: "csushpinsa",
            title: "Case-Shiller U.S. National Home Price Index",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 0 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 0 }), "Home Price Index"],
            citation: "S&P Dow Jones Indices LLC, S&P/Case-Shiller U.S. National Home Price Index, FRED Economic Data",
        },
    },
    {
        title: "Existing Home Sales",
        blurb: "Tracks sales of previously owned homes. Declining existing home sales indicate weakening housing demand and potential economic slowdown.",
        category: "housing",
        chartProps: {
            chartName: "exhoslusm495s",
            title: "Existing Home Sales (Millions)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 1 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 1 }), "Existing Home Sales (Millions)"],
            citation: "National Association of Realtors, Existing Home Sales, FRED Economic Data",
        },
    },


];

export const getChartsByCategory = (category: string): ChartDefinition[] => {
    return allCharts.filter(chart => chart.category === category);
};

export const getAllCategories = (): string[] => {
    return [...new Set(allCharts.map(chart => chart.category))];
};

export const categoryDisplayNames: Record<string, string> = {
    consumer: "Consumer",
    labor: "Labor Market",
    production: "Production",
    financial: "Financial Conditions",
    housing: "Housing",
};