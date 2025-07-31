"use client";
import LineChartCard, { LineChartCardProps } from "../home-components/LineChartCard";
import ChartSearch from "../home-components/ChartSearch";
import { useEffect, useState } from "react";

const financialCharts: Array<{
    title: string;
    blurb: string;
    chartProps: LineChartCardProps;
}> = [
    {
        title: "Yield Curve",
        blurb: "Shows the difference between short-term and long-term interest rates. When the yield curve 'inverts'—meaning short-term rates are higher than long-term rates—it's often a signal that a recession could be on the way.",
        chartProps: {
            chartName: "yieldcurve",
            title: "Yield Curve",
            range: { months: 6 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString(),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Yield Curve"],
        },
    },
    {
        title: "St. Louis Financial Stress Index",
        blurb: "Measures the degree of financial stress in U.S. markets, based on indicators like interest rates, yield spreads, and asset prices. Higher values indicate greater stress in the financial system.",
        chartProps: {
            chartName: "stlfsi4",
            title: "St. Louis Financial Stress Index",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "Stress Index"],
        },
    },
    {
        title: "High-Yield Corporate Bond Spread",
        blurb: "Tracks the extra yield investors demand to hold junk-rated bonds versus Treasuries. When this ‘risk-premium’ widens, credit is tightening and recession odds climb.",
        chartProps: {
            chartName: "bamlh0a0hym2",
            title: "High-Yield OAS",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`, "Spread"],
        },
    },
    {
        title: "Chicago Fed National Financial Conditions Index",
        blurb: "A weekly composite of 105 market prices, credit spreads, and leverage ratios. Positive values = tighter than average conditions; negatives = easier.",
        chartProps: {
            chartName: "nfci",
            title: "Chicago Fed NFCI",
            range: { months: 18 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
            tooltipLabelFormatter: (l: string) => `Week: ${l}`,
            tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "NFCI"],
        },
    },
    // Add new charts here as needed
];

export default function FinancialConditionsPage() {
    const [outlook, setOutlook] = useState<{ percentScore: number; summary: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [filteredCharts, setFilteredCharts] = useState(financialCharts);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outlook/financial`)
            .then((res) => res.json())
            .then((data) => setOutlook(data))
            .then(() => setLoading(false))
            .catch(() => setOutlook(null));
    }, []);
    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-wrap items-end justify-between mb-6 gap-y-2">
                <h1 className="text-3xl font-bold">Financial Conditions Outlook & Analysis</h1>
                {outlook && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-base font-medium">Stability Score:</span>
                        <span className="text-2xl font-extrabold text-accent">{outlook.percentScore}%</span>
                    </div>
                )}
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-[#c8bcab] rounded-full"></div>
                </div>
            ) : (
                outlook && (
                    <div className="text-gray-800 mb-8">
                        {outlook.summary.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                        ))}
                    </div>
                )
            )}
            
            {/* Charts Section */}
            <div className="mt-16">
                <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-bold mb-6">Financial Conditions Data Charts</h2>
                    <ChartSearch charts={financialCharts} onFilteredChartsChange={setFilteredCharts} />
                    <div className="flex flex-col gap-10">
                        {filteredCharts.map(({ title, blurb, chartProps }) => (
                            <article
                                key={title}
                                className="bg-white border border-accent/30 rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center md:items-stretch"
                            >
                                <div className="w-full md:w-3/5 aspect-[5/3] mb-6 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent/20 to-white">
                                    <LineChartCard {...chartProps} height={240} />
                                </div>
                                <div className="md:w-2/5 flex flex-col justify-center md:pl-8">
                                    <h3 className="text-xl font-bold mb-2 text-left">{title}</h3>
                                    <p className="text-gray-700 text-left">{blurb}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}