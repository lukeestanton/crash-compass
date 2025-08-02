"use client";
import LineChartCard from "./LineChartCard";
import ChartSearch from "./ChartSearch";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ChartDefinition, getChartsByCategory, categoryDisplayNames } from "../data/chartDefinitions";

interface GenericCategoryPageProps {
    category: string;
}

export default function GenericCategoryPage({ category }: GenericCategoryPageProps) {
    const [outlook, setOutlook] = useState<{ percentScore: number; summary: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [filteredCharts, setFilteredCharts] = useState<ChartDefinition[]>([]);

    const categoryCharts = useMemo(() => getChartsByCategory(category), [category]);
    const displayName = categoryDisplayNames[category] || category;

    const handleFilteredChartsChange = useCallback((filteredCharts: ChartDefinition[]) => {
        setFilteredCharts(filteredCharts);
    }, []);

    useEffect(() => {
        setFilteredCharts(categoryCharts);
    }, [categoryCharts]);

    useEffect(() => {
        setLoading(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        fetch(`${apiBaseUrl}/api/outlook/${category}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data && typeof data.percentScore === 'number' && data.summary) {
                    setOutlook(data);
                } else {
                    console.warn('Invalid outlook data received:', data);
                    setOutlook(null);
                }
            })
            .catch((error) => {
                console.error('Error fetching outlook data:', error);
                setOutlook(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [category]);

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-wrap items-end justify-between mb-6 gap-y-2">
                <h1 className="text-3xl font-bold">{displayName} Outlook & Analysis</h1>
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
                outlook && outlook.summary ? (
                    <div className="text-gray-800 mb-8">
                        {outlook.summary.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                        ))}
                    </div>
                ) : !loading && (
                    <div className="text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg">
                        <p>Outlook analysis is currently unavailable for this category.</p>
                    </div>
                )
            )}
            
            {/* Charts Section */}
            <div className="mt-16">
                <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-bold mb-6">{displayName} Data Charts</h2>
                    <ChartSearch charts={categoryCharts} onFilteredChartsChange={handleFilteredChartsChange} />
                    <div className="flex flex-col gap-10">
                        {filteredCharts.map(({ title, blurb, chartProps }) => (
                            <article
                                key={title}
                                className="bg-white border border-accent/30 rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center md:items-stretch"
                            >
                                <div className="w-full md:w-4/5 aspect-[5/4] mb-6 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent/20 to-white">
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