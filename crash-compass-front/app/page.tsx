// home
"use client";
import MainDial from "./components/MainDial";
import OutlookCard from "./components/OutlookCard";
import { useState, useEffect } from "react";

interface OutlookData {
  percentScore: number;
}

export default function Home() {
  const [outlookData, setOutlookData] = useState<Record<string, OutlookData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutlookData = async () => {
      try {
        const categories = ['labor', 'consumer', 'financial', 'production', 'housing'];
        const promises = categories.map(async (category) => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outlook/${category}`);
          if (response.ok) {
            const data = await response.json();
            return [category, { percentScore: data.percentScore }];
          }
          return [category, { percentScore: 50 }];
        });

        const results = await Promise.all(promises);
        const data = Object.fromEntries(results);
        setOutlookData(data);
      } catch (error) {
        console.error('Failed to fetch outlook data:', error);
        // if API fails
        const defaultData = {
          labor: { percentScore: 50 },
          consumer: { percentScore: 50 },
          financial: { percentScore: 50 },
          production: { percentScore: 50 },
          housing: { percentScore: 50 }
        };
        setOutlookData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchOutlookData();
  }, []);

  const outlookCards = [
    {
      title: "Labor Market",
      category: "labor",
      color: "#c8bcab",
                      href: "/labor"
    },
    {
      title: "Consumer Behavior", 
      category: "consumer",
      color: "#c8bcab",
      href: "/consumer"
    },
    {
      title: "Financial Conditions",
      category: "financial", 
      color: "#c8bcab",
                      href: "/financial"
    },
    {
      title: "Production",
      category: "production",
      color: "#c8bcab", 
      href: "/production"
    },
    {
      title: "Housing",
      category: "housing",
      color: "#c8bcab",
      href: "/housing"
    }
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-10 py-4 md:py-3 text-[var(--foreground)]">
      <MainDial />
      
      {/* Outlook Cards Section */}
      <section className="mb-16">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">Economic Outlook</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Click any card to view detailed analysis and charts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outlookCards.map((card) => {
            const data = outlookData[card.category];
            return (
              <OutlookCard
                key={card.category}
                title={card.title}
                category={card.category}
                score={loading ? 0 : data?.percentScore || 50}
                color={card.color}
                href={card.href}
                loading={loading}
              />
            );
          })}
        </div>
      </section>

      <section className="mb-24 grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-3">How it Works</h2>
          <p className="mb-6 text-gray-700 leading-relaxed text-lg">
            Our dashboard crunches decades of official economic data using machine learning, so you don't have to. Here's how we turn raw numbers into the dial at the top of this page.
          </p>
          <ol className="space-y-7 text-gray-800 text-base leading-relaxed pl-4 border-l-4 border-accent/60">
            <li>
              <span className="font-bold text-accent">Track</span>
              &nbsp;· We gather fresh numbers from the Fed, BLS, and Treasury every morning.
            </li>
            <li>
              <span className="font-bold text-accent">Analyze</span>
              &nbsp;· Our advanced machine learning model scans 60+ years of trends to learn the signals that tend to show up before recessions or recoveries.
            </li>
            <li>
              <span className="font-bold text-accent">Predict</span>
              &nbsp;· The model weighs hundreds of indicators in real time, looking for subtle warning signs and healthy signals alike.
            </li>
            <li>
              <span className="font-bold text-accent">Interpret</span>
              &nbsp;· We display our model's findings as a simple percentage score, along with every chart and data point that influenced it for your own interpretation.
            </li>
          </ol>
        </div>
        <div className="bg-white border border-accent/30 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center max-w-sm mx-auto">
          <span className="text-6xl font-extrabold text-accent mb-4">🧠</span>
          <h3 className="font-semibold text-xl mb-2 text-accent">Machine Learning, Out in the Open</h3>
          <p className="text-gray-700 mb-3">
            Our code and models are open-source. <br />
            See exactly how the score is calculated, or just enjoy the insights.
          </p>
          <p>
            
            Help improve the model by contributing to the codebase or suggesting new indicators.

          </p>
          <a
            href="https://github.com/lukeestanton/crash-compass"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-accent underline font-medium hover:text-accent/80 transition"
          >
            View on GitHub →
          </a>
          <a
            href="https://fred.stlouisfed.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-accent underline font-medium hover:text-accent/80 transition"
          >
            View data sources →
          </a>
        </div>
      </section>
    </main>
  );
}
