"use client";
import LineChartCard, { LineChartCardProps } from "../home-components/LineChartCard";
import { useEffect, useState } from "react";

const laborCharts: Array<{
    title: string;
    blurb: string;
    chartProps: LineChartCardProps;
}> = [
        {
            title: "Unemployment Rate",
            blurb: "Shows the share of people who are looking for work but can’t find it—when this number climbs, it’s often an early sign the economy is starting to slow.",
            chartProps: {
                chartName: "unemployment",
                title: "Unemployment",
                range: { months: 60 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => `${t}%`,
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [`${v}%`, "Unemployment"],
            },
        },
        {
            title: "Initial Jobless Claims",
            blurb: "Tracks new filings for unemployment benefits. Rising claims can signal trouble in the labor market before it shows up in the unemployment rate.",
            chartProps: {
                chartName: "initialclaims",
                title: "Initial Jobless Claims",
                range: { months: 18 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Jobless Claims"],
            },
        },
        {
            title: "All Employees, Total Nonfarm",
            blurb: "Measures the total number of paid U.S. workers in all nonfarm industries. Increases signal job growth, while declines may signal economic trouble.",
            chartProps: {
                chartName: "payems",
                title: "All Employees, Total Nonfarm",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Employees (Thousands)"],
            },
        },
        {
            title: "Average Weekly Hours, Manufacturing",
            blurb: "Tracks the average weekly hours worked by production and nonsupervisory employees in manufacturing. Changes can signal shifts in demand, hiring, or overtime trends.",
            chartProps: {
                chartName: "awhman",
                title: "Avg. Weekly Hours (Manufacturing)",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Hours"],
            },
        },
    ];

export default function LaborMarketPage() {
    const [outlook, setOutlook] = useState<{ percentScore: number; summary: string } | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outlook/labor`)
            .then((res) => res.json())
            .then((data) => setOutlook(data))
            .then(() => setLoading(false))
            .catch(() => setOutlook(null));
    }, []);
    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-wrap items-end justify-between mb-6 gap-y-2">
                <h1 className="text-3xl font-bold">Labor Market Outlook & Analysis</h1>
                {outlook && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-base font-medium">Outlook Score:</span>
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
                    <div className="text-gray-800 mb-10">
                        {outlook.summary.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                        ))}
                    </div>
                )
            )}

            <h2 className="text-2xl font-bold mb-8">Labor Market Data</h2>

            <div className="flex flex-col gap-8">
                {laborCharts.map(({ title, blurb, chartProps }) => (
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
        </main>


    );
}