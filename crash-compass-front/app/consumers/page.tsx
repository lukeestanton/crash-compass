"use client";
import LineChartCard, { LineChartCardProps } from "../home-components/LineChartCard";
import ChartSearch from "../home-components/ChartSearch";
import { useEffect, useState } from "react";

// List of all charts for the consumers section
const consumersCharts: Array<{
    title: string;
    blurb: string;
    chartProps: LineChartCardProps;
    featured?: boolean;
}> = [
        {
            title: "Consumer Sentiment",
            blurb:
                "Measures how optimistic or pessimistic people feel about their personal finances and the economy overall. When sentiment drops, it often means people are worried and may spend less.",
            chartProps: {
                chartName: "consumersentiment",
                title: "Consumer Sentiment",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Consumer Sentiment"],
            },
            featured: true,
        },
        {
            title: "Retail Sales",
            blurb:
                "Tracks how much people are spending in stores and online. Growing sales usually mean people feel confident about their finances, while falling sales can be an early warning sign of economic trouble.",
            chartProps: {
                chartName: "retailsales",
                title: "Retail Sales",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Retail Sales"],
            },
            featured: true,
        },
        {
            title: "Personal Consumption Expenditures",
            blurb:
                "Measures the value of goods and services purchased by U.S. households. Growth in PCE signals rising consumer spending, a key driver of economic activity.",
            chartProps: {
                chartName: "pcec96",
                title: "Real Personal Consumption Expenditures",
                range: { years: 10 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "PCE ($ Billions)"],
            },
        },
        {
            title: "Personal Saving Rate",
            blurb:
                "Shows the percentage of disposable income that U.S. households save each month. A rising saving rate can signal caution or uncertainty among consumers, while a falling rate may indicate increased spending.",
            chartProps: {
                chartName: "psavert",
                title: "Personal Saving Rate",
                range: { months: 60 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => `${t}%`,
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [`${v}%`, "Saving Rate"],
            },
        },
    ];

export default function ConsumersPage() {
    const [outlook, setOutlook] = useState<{ percentScore: number; summary: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [filteredCharts, setFilteredCharts] = useState(consumersCharts);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outlook/consumer`)
            .then((res) => res.json())
            .then((data) => setOutlook(data))
            .then(() => setLoading(false))
            .catch(() => setOutlook(null));
    }, []);
    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-wrap items-end justify-between mb-6 gap-y-2">
                <h1 className="text-3xl font-bold">Consumer Outlook & Analysis</h1>
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
                    <h2 className="text-2xl font-bold mb-6">Consumer Data</h2>
                    <ChartSearch charts={consumersCharts} onFilteredChartsChange={setFilteredCharts} />
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