"use client";
import { useState, useMemo, useEffect } from "react";
import { ChartDefinition } from "../data/chartDefinitions";

interface ChartSearchProps {
    charts: ChartDefinition[];
    onFilteredChartsChange: (filteredCharts: ChartDefinition[]) => void;
}

export default function ChartSearch({ charts, onFilteredChartsChange }: ChartSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCharts = useMemo(() => {
        if (!searchTerm.trim()) {
            return charts;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return charts.filter(
            (chart) =>
                chart.title.toLowerCase().includes(lowerSearchTerm) ||
                chart.blurb.toLowerCase().includes(lowerSearchTerm)
        );
    }, [charts, searchTerm]);

    // Update parent component whenever filtered charts change
    useEffect(() => {
        onFilteredChartsChange(filteredCharts);
    }, [filteredCharts, onFilteredChartsChange]);

    return (
        <div className="mb-8">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search charts by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-colors"
                />
                <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            {searchTerm && (
                <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredCharts.length} of {charts.length} charts
                </div>
            )}
        </div>
    );
} 