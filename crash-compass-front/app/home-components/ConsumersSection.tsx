"use client";

import LineChartCard, { LineChartCardProps } from "./LineChartCard";
import Link from "next/link";

export default function ConsumersSection() {
    const featuredCharts = [
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
            } as LineChartCardProps,
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
            } as LineChartCardProps,
        },
    ];

    const smallCharts = [
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
            } as LineChartCardProps,
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
            } as LineChartCardProps,
        },
    ];

    return (
        <section className="mb-12">
            <details className="group border border-accent/30 rounded-2xl">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-xl font-bold bg-white rounded-2xl hover:bg-accent/10 transition">
                    <span className="flex items-center gap-6">
                        <span>Consumers</span>
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>

                <div className="p-8 pt-4 flex flex-col gap-8">
                    <div className="mb-4">
                        <Link
                            href="/consumers"
                            className="
                                text-base font-semibold 
                                text-[#c8bcab] 
                                hover:text-[#f7ecd6] 
                                hover:underline 
                                underline-offset-2
                                transition-colors
                            "
                        >
                            VIEW INSIGHTS
                        </Link>
                    </div>
                    {featuredCharts.map(({ title, blurb, chartProps }) => (
                        <article
                            key={title}
                            className="bg-white border border-accent/30 rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center md:items-stretch"
                        >
                            <div className="w-full md:w-2/3 aspect-[5/3] md:aspect-auto mb-6 md:mb-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent/20 to-white">
                                <LineChartCard {...chartProps} />
                            </div>
                            <div className="md:w-1/3 flex flex-col justify-center md:pl-8">
                                <h3 className="text-xl font-bold mb-2 text-left">{title}</h3>
                                <p className="text-gray-700 text-left">{blurb}</p>
                            </div>
                        </article>
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {smallCharts.map(({ title, blurb, chartProps }) => (
                            <article
                                key={title}
                                className="bg-white border border-accent/30 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
                            >
                                <div className="w-full aspect-[5/3] mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent/20 to-white">
                                    <LineChartCard {...chartProps} height={180} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold mb-1 text-left">{title}</h3>
                                    <p className="text-gray-700 text-sm text-left">{blurb}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </details>
        </section>
    );
}
