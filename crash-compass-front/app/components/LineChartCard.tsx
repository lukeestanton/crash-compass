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
    citation?: string;
}

const ACCENT = "#C8BCAB";
const GRID_STROKE = "rgba(0,0,0,0.06)";
const TEXT_GRAY = "#4A4A4A";

type TimeRange = {
    label: string;
    months?: number;
    years?: number;
    start?: string;
    end?: string;
};

const PRESET_RANGES: TimeRange[] = [
    { label: "6M", months: 6 },
    { label: "1Y", months: 12 },
    { label: "5Y", years: 5 }
];

export default function LineChartCard({
    chartName,
    title,
    range = { months: 6 },
    yDomain = ["auto", "auto"],
    yTickFormatter = v => v,
    tooltipLabelFormatter = l => l,
    tooltipValueFormatter = v => [v, title],
    apiBase = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chart`,
    height = 320,
    citation,
}: LineChartCardProps) {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedRange, setSelectedRange] = useState<TimeRange>({ label: "6M", months: 6 });

    useEffect(() => {
        if ("months" in range && range.months) {
            const presetRange = PRESET_RANGES.find(r => r.months === range.months);
            if (presetRange) {
                setSelectedRange(presetRange);
            } else {
                const defaultRange = PRESET_RANGES.find(r => r.months === 6);
                setSelectedRange(defaultRange || { label: "6M", months: 6 });
            }
        } else if ("years" in range && range.years) {
            const presetRange = PRESET_RANGES.find(r => r.years === range.years);
            if (presetRange) {
                setSelectedRange(presetRange);
            } else {
                const defaultRange = PRESET_RANGES.find(r => r.months === 6);
                setSelectedRange(defaultRange || { label: "6M", months: 6 });
            }
        } else if ("start" in range && "end" in range && range.start && range.end) {
            const defaultRange = PRESET_RANGES.find(r => r.months === 6);
            setSelectedRange(defaultRange || { label: "6M", months: 6 });
        } else if ("start" in range && range.start) {
            const defaultRange = PRESET_RANGES.find(r => r.months === 6);
            setSelectedRange(defaultRange || { label: "6M", months: 6 });
        } else if ("end" in range && range.end) {
            const defaultRange = PRESET_RANGES.find(r => r.months === 6);
            setSelectedRange(defaultRange || { label: "6M", months: 6 });
        }
    }, [range]);

    const buildQuery = (timeRange: TimeRange): string => {
        let query = "";
        if (timeRange.months) query = `months=${timeRange.months}`;
        else if (timeRange.years) query = `years=${timeRange.years}`;
        else if (timeRange.start && timeRange.end) query = `start=${timeRange.start}&end=${timeRange.end}`;
        else if (timeRange.start) query = `start=${timeRange.start}`;
        else if (timeRange.end) query = `end=${timeRange.end}`;
        return query;
    };

    useEffect(() => {
        const query = buildQuery(selectedRange);
        fetch(`${apiBase}/${chartName}/history${query ? `?${query}` : ""}`)
            .then(res => res.json())
            .then(setData)
            .catch(() => setError("Failed to load data"));
    }, [chartName, selectedRange, apiBase]);

    const handleRangeSelect = (timeRange: TimeRange) => {
        setSelectedRange(timeRange);
    };

    const exportToCSV = () => {
        if (!data.length) return;
        
        const headers = ["Date", title];
        const csvContent = [
            headers.join(","),
            ...data.map(row => `${row.date},${row.value}`)
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${chartName}_${selectedRange.label}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const dateFmt = (v: string) =>
        new Date(v).toLocaleDateString("en-US", { month: "short", year: "2-digit" });

    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={exportToCSV}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        title="Export to CSV"
                    >
                        CSV
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-gray-600 mr-2">Time Range:</span>
                    {PRESET_RANGES.map((timeRange) => (
                        <button
                            key={timeRange.label}
                            onClick={() => handleRangeSelect(timeRange)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                selectedRange.label === timeRange.label
                                    ? "bg-[#c8bcab] text-white border border-[#c8bcab]"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {timeRange.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ height: height }}>
                <ResponsiveContainer width="100%" height="100%">
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
            </div>
            
            {citation && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                        <span className="font-medium">Source:</span> {citation}
                    </div>
                </div>
            )}
        </div>
    );
}
