import Link from "next/link";
import LineChartCard, { LineChartCardProps } from "./LineChartCard";

export default function FinancialConditionsSection() {
    const featuredCharts = [
        {
            title: "Yield Curve",
            blurb:
                "Shows the difference between short-term and long-term interest rates. When the yield curve 'inverts'—meaning short-term rates are higher than long-term rates—it’s often a signal that a recession could be on the way.",
            chartProps: {
                chartName: "yieldcurve",
                title: "Yield Curve",
                range: { months: 6 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString(),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString(), "Yield Curve"],
            } as LineChartCardProps,
        },
        {
            title: "St. Louis Financial Stress Index",
            blurb:
                "Measures the degree of financial stress in U.S. markets, based on indicators like interest rates, yield spreads, and asset prices. Higher values indicate greater stress in the financial system.",
            chartProps: {
                chartName: "stlfsi4",
                title: "St. Louis Financial Stress Index",
                range: { months: 18 },
                yDomain: ["auto", "auto"],
                yTickFormatter: (t: number) => t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
                tooltipLabelFormatter: (l: string) => `Month: ${l}`,
                tooltipValueFormatter: (v: number) => [v.toLocaleString("en-US", { maximumFractionDigits: 2 }), "Stress Index"],
            } as LineChartCardProps,
        },

    ];

const smallCharts = [
  {
    title: "High-Yield Corporate Bond Spread",
    blurb:
      "Tracks the extra yield investors demand to hold junk-rated bonds versus Treasuries. When this ‘risk-premium’ widens, credit is tightening and recession odds climb.",
    chartProps: {
      chartName: "bamlh0a0hym2",
      title: "High-Yield OAS",
      range: { months: 36 },
      yDomain: ["auto", "auto"],
      yTickFormatter: (t: number) =>
        `${t.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
      tooltipLabelFormatter: (l: string) => `Week: ${l}`,
      tooltipValueFormatter: (v: number) => [
        `${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
        "Spread",
      ],
    } as LineChartCardProps,
  },
  {
    title: "Chicago Fed National Financial Conditions Index",
    blurb:
      "A weekly composite of 105 market prices, credit spreads, and leverage ratios. Positive values = tighter than average conditions; negatives = easier.",
    chartProps: {
      chartName: "nfci",
      title: "Chicago Fed NFCI",
      range: { months: 18 },
      yDomain: ["auto", "auto"],
      yTickFormatter: (t: number) =>
        t.toLocaleString("en-US", { maximumFractionDigits: 2 }),
      tooltipLabelFormatter: (l: string) => `Week: ${l}`,
      tooltipValueFormatter: (v: number) => [
        v.toLocaleString("en-US", { maximumFractionDigits: 2 }),
        "NFCI",
      ],
    } as LineChartCardProps,
  },
];


    return (
        <section className="mb-12">
            <details className="group border border-accent/30 rounded-2xl">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-xl font-bold bg-white rounded-2xl hover:bg-accent/10 transition">
                    <span className="flex items-center gap-6">
                        <span>Financial Conditions</span>
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-8 pt-4 flex flex-col gap-8">
                    <div className="mb-4">
                        <Link
                            href="/financial-conditions"
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
