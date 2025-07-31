"use client";
import LineChartCard, { LineChartCardProps } from "../home-components/LineChartCard";
import ChartSearch from "../home-components/ChartSearch";
import { useEffect, useState } from "react";

const productionCharts: Array<{
    title: string;
    blurb: string;
    chartProps: LineChartCardProps;
}> = [
    {
        title: "Industrial Production – YoY %",
        blurb: "Tracks the year-over-year change in physical output from factories, mines, and utilities. Persistent declines are a classic sign that the real economy is contracting.",
        chartProps: {
            chartName: "indpro",
            title: "Industrial Production (YoY %)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "YoY Growth"],
        },
    },
    {
        title: "Capacity Utilization – Total Industry",
        blurb: "Shows how much of America’s industrial plant is in use. Falling utilization signals slack demand and typically precedes layoffs and cutbacks.",
        chartProps: {
            chartName: "tcu",
            title: "Capacity Utilization (%)",
            range: { months: 60 },
            yDomain: ["auto", "auto"],
            yTickFormatter: (t: number) => `${t}%`,
            tooltipLabelFormatter: (l: string) => `Month: ${l}`,
            tooltipValueFormatter: (v: number) => [`${v}%`, "Utilization"],
        },
    },
    {
        title: "Durable-Goods New Orders",
        blurb: "Headline factory orders for long-lived goods—from appliances to aircraft. A sustained slide often foreshadows cutbacks in production and hiring.",
        chartProps: {
            chartName: "dgorder",
            title: "Durable Goods Orders",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: n => n.toLocaleString(),
            tooltipLabelFormatter: l => `Month: ${l}`,
            tooltipValueFormatter: v => [v.toLocaleString(), "Millions $"],
        },
    },
    {
        title: "Core Capital-Goods Orders",
        blurb: "Non-defense capital goods excluding aircraft. Economists use it as a clean read on business investment plans.",
        chartProps: {
            chartName: "neworder",
            title: "Core Capital-Goods Orders",
            range: { months: 36 },
            yDomain: ["auto", "auto"],
            yTickFormatter: n => n.toLocaleString(),
            tooltipLabelFormatter: l => `Month: ${l}`,
            tooltipValueFormatter: v => [v.toLocaleString(), "Millions $"],
        },
    },
    // Add new charts here as needed
];

export default function ProductionPage() {
    const [outlook, setOutlook] = useState<{ percentScore: number; summary: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [filteredCharts, setFilteredCharts] = useState(productionCharts);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outlook/production`)
            .then((res) => res.json())
            .then((data) => setOutlook(data))
            .then(() => setLoading(false))
            .catch(() => setOutlook(null));
    }, []);
    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-wrap items-end justify-between mb-6 gap-y-2">
                <h1 className="text-3xl font-bold">Production Outlook & Analysis</h1>
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
                    <h2 className="text-2xl font-bold mb-6">Production Data Charts</h2>
                    <ChartSearch charts={productionCharts} onFilteredChartsChange={setFilteredCharts} />
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