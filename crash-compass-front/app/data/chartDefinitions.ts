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
};