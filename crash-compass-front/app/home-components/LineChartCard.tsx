import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

type ChartRange =
  | { months: number }
  | { years: number }
  | { start: string; end?: string }
  | { end: string; start?: string }
  | {};

export interface LineChartCardProps {
    chartName: string;
    title: string;
    range?: ChartRange;
    yDomain?: [number, number] | ["auto", "auto"];
    yTickFormatter?: (v: any) => any;
    tooltipLabelFormatter?: (l: any) => any;
    tooltipValueFormatter?: (v: any) => any[];
    apiBase?: string;
    height?: number;
}

const ACCENT = "#C8BCAB";
const GRID_STROKE = "rgba(0,0,0,0.06)";
const TEXT_GRAY = "#4A4A4A";

export default function LineChartCard({
    chartName,
    title,
    range = { months: 18 },
    yDomain = ["auto", "auto"],
    yTickFormatter = v => v,
    tooltipLabelFormatter = l => l,
    tooltipValueFormatter = v => [v, title],
    apiBase = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chart`,
    height = 320,
}: LineChartCardProps) {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    let query = "";
    if ("months" in range && range.months) query = `months=${range.months}`;
    else if ("years" in range && range.years) query = `years=${range.years}`;
    else if ("start" in range && "end" in range && range.start && range.end)
        query = `start=${range.start}&end=${range.end}`;
    else if ("start" in range && range.start) query = `start=${range.start}`;
    else if ("end" in range && range.end) query = `end=${range.end}`;

    useEffect(() => {
        fetch(`${apiBase}/${chartName}/history${query ? `?${query}` : ""}`)
            .then(res => res.json())
            .then(setData)
            .catch(() => setError("Failed to load data"));
    }, [chartName, query, apiBase]);

    const dateFmt = (v: string) =>
        new Date(v).toLocaleDateString("en-US", { month: "short", year: "2-digit" });

    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid stroke={GRID_STROKE} strokeDasharray="4 4" />
                <XAxis
                    dataKey="date"
                    tickFormatter={dateFmt}
                    tick={{ fill: TEXT_GRAY, fontSize: 12 }}
                    tickMargin={6}
                />
                <YAxis
                    domain={yDomain}
                    tickFormatter={yTickFormatter}
                    tick={{ fill: TEXT_GRAY, fontSize: 12 }}
                    axisLine={false}
                />
                <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ borderRadius: 8, borderColor: ACCENT }}
                    labelFormatter={tooltipLabelFormatter}
                    formatter={tooltipValueFormatter}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={ACCENT}
                    strokeWidth={5}
                    dot={{ r: 4, stroke: "#C8BCAB", strokeWidth: 1.2 }}
                    activeDot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
