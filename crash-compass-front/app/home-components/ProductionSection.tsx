import Link from "next/link";
import LineChartCard, { LineChartCardProps } from "./LineChartCard";

export default function ProductionSection() {
    // ─── Featured (full-width) charts ────────────────────────────────────────────
    const featuredCharts = [
        {
            title: "Industrial Production – YoY %",
            blurb:
                "Tracks the year-over-year change in physical output from factories, mines, and utilities. Persistent declines are a classic sign that the real economy is contracting.",
            chartProps: {
                chartName: "indpro",
                title: "Industrial Production (YoY %)",
                range: { months: 60 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => `${t}%`,
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [`${v}%`, "YoY Growth"],
            } as LineChartCardProps,
        },
        {
            title: "Capacity Utilization – Total Industry",
            blurb:
                "Shows how much of America’s industrial plant is in use. Falling utilization signals slack demand and typically precedes layoffs and cutbacks.",
            chartProps: {
                chartName: "tcu",
                title: "Capacity Utilization (%)",
                range: { months: 60 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => `${t}%`,
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [`${v}%`, "Utilization"],
            } as LineChartCardProps,
        },
    ];

    const smallCharts = [
        {
            title: "Durable-Goods New Orders",
            blurb:
                "Headline factory orders for long-lived goods—from appliances to aircraft. A sustained slide often foreshadows cutbacks in production and hiring.",
            chartProps: {
                chartName: "dgorder",
                title: "Durable Goods Orders",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: n => n.toLocaleString(),
                tooltipLabelFormatter: l => `Month: ${l}`,
                tooltipValueFormatter: v => [v.toLocaleString(), "Millions $"],
            } as LineChartCardProps,
        },
        {
            title: "Core Capital-Goods Orders",
            blurb:
                "Non-defense capital goods excluding aircraft. Economists use it as a clean read on business investment plans.",
            chartProps: {
                chartName: "neworder",
                title: "Core Capital-Goods Orders",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: n => n.toLocaleString(),
                tooltipLabelFormatter: l => `Month: ${l}`,
                tooltipValueFormatter: v => [v.toLocaleString(), "Millions $"],
            } as LineChartCardProps,
        },
    ];


    return (
        <section className="mb-24">
            <details className="group border border-accent/30 rounded-2xl">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-xl font-bold bg-white rounded-2xl hover:bg-accent/10 transition">
                    <span className="flex items-center gap-6">
                        <span>Production</span>
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-8 pt-4 flex flex-col gap-8">
                    <div className="mb-4">
                        <Link
                            href="/production"
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
                    {/* Featured charts */}
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

                    {/* Small charts */}
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
