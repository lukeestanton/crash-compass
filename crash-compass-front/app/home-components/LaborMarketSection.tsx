import LineChartCard, { LineChartCardProps } from "./LineChartCard";
import Link from "next/link";

export default function LaborMarketSection() {
    const featuredCharts = [
        {
            title: "Unemployment Rate",
            blurb:
                "Shows the share of people who are looking for work but can’t find it—when this number climbs, it’s often an early sign the economy is starting to slow.",
            chartProps: {
                chartName: "unemployment",
                title: "Unemployment",
                range: { months: 60 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => `${t}%`,
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [`${v}%`, "Unemployment"],
            } as LineChartCardProps,
        },
        {
            title: "Initial Jobless Claims",
            blurb:
                "Tracks new filings for unemployment benefits. Rising claims can signal trouble in the labor market before it shows up in the unemployment rate.",
            chartProps: {
                chartName: "initialclaims",
                title: "Initial Jobless Claims",
                range: { months: 18 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Jobless Claims"],
            } as LineChartCardProps,
        },
    ];

    const smallCharts = [
        {
            title: "All Employees, Total Nonfarm",
            blurb:
                "Measures the total number of paid U.S. workers in all nonfarm industries. Increases signal job growth, while declines may signal economic trouble.",
            chartProps: {
                chartName: "payems",
                title: "All Employees, Total Nonfarm",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Employees (Thousands)"],
            } as LineChartCardProps,
        },
        {
            title: "Average Weekly Hours, Manufacturing",
            blurb:
                "Tracks the average weekly hours worked by production and nonsupervisory employees in manufacturing. Changes can signal shifts in demand, hiring, or overtime trends.",
            chartProps: {
                chartName: "awhman",
                title: "Avg. Weekly Hours (Manufacturing)",
                range: { months: 36 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Hours"],
            } as LineChartCardProps,
        },
    ];

    return (
        <section className="mb-12">
            <details className="group border border-accent/30 rounded-2xl">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-xl font-bold bg-white rounded-2xl hover:bg-accent/10 transition">
                    <span className="flex items-center gap-6">
                        <span>Labor Market</span>
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-8 pt-4 flex flex-col gap-8">
                    <div className="mb-4">
                        <Link
                            href="/labor-market"
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
