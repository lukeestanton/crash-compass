"use client";
import MainDial from "./home-components/MainDial";
import LaborMarketSection from "./home-components/LaborMarketSection";
import ConsumersSection from "./home-components/ConsumersSection";
import FinancialConditionsSection from "./home-components/FinancialConditionsSection";
import ProductionSection from "./home-components/ProductionSection";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-10 py-3 text-[var(--foreground)]">
      <MainDial />
      <LaborMarketSection />
      <ConsumersSection />
      <FinancialConditionsSection />
      <ProductionSection />

      <section className="mb-24 grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6">How it Works</h2>
          <p className="mb-8 text-gray-700 leading-relaxed text-lg">
            Our dashboard crunches decades of official economic data using machine learning, so you don’t have to. Here’s how we turn raw numbers into the dial at the top of this page.
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
              &nbsp;· We display our model’s findings as a simple percentage score, along with every chart and data point that influenced it for your own interpretation.
            </li>
          </ol>
        </div>
        <div className="bg-white border border-accent/30 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center max-w-sm mx-auto mt-20">
          <span className="text-6xl font-extrabold text-accent mb-4">🧠</span>
          <h3 className="font-semibold text-xl mb-2 text-accent">Machine Learning, Out in the Open</h3>
          <p className="text-gray-700 mb-3">
            Our code and models are open-source. <br />
            See exactly how the score is calculated, or just enjoy the insights.
          </p>
          <a
            href="https://github.com/yourprojectrepo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-accent underline font-medium hover:text-accent/80 transition"
          >
            View on GitHub →
          </a>
        </div>
      </section>

      <footer className="text-center text-sm text-accent/70">
        &copy; {new Date().getFullYear()} CrashCompass. All rights reserved.
      </footer>
    </main>
  );
}
