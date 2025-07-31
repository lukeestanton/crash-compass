"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const BORDER = "#8E7757";
const BORDER_W = 8;

interface NeedleProps {
  value: number;
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
}
function Needle({ value, cx, cy, iR, oR, color }: NeedleProps) {
  const ang = 180 * (1 - value / 100);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);

  const r = 14;
  const x0 = cx, y0 = cy;
  const xba = x0 + r * sin, yba = y0 - r * cos;
  const xbb = x0 - r * sin, ybb = y0 + r * cos;
  const xp = x0 + length * cos, yp = y0 + length * sin;

  return (
    <>
      <circle cx={x0} cy={y0} r={20} fill="#F7F5F1" stroke={BORDER} strokeWidth={6} />
      <path
        d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`}
        fill={color}
        stroke={BORDER}
        strokeWidth={BORDER_W}
        strokeLinejoin="round"
        filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.12))"
      />
      <circle cx={x0} cy={y0} r={r} fill={color} stroke={BORDER} strokeWidth={BORDER_W} />
    </>
  );
}

export default function MainDial() {
  const [dialVal, setDialVal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dial`)
      .then(res => res.json())
      .then(data => setDialVal(data.score ?? data.Score ?? 0))
      .then(() => setLoading(false))
      .catch(() => setError("Failed to load forecast"));
  }, []);

  const data = [
    { name: "Lowest", value: 5, color: "#86B99A" },
    { name: "Lower", value: 15, color: "#A9CBB6" },
    { name: "Low", value: 15, color: "#CEDDCB" },
    { name: "Medium", value: 30, color: "#D1C5AF" },
    { name: "High", value: 15, color: "#E6B2A6" },
    { name: "Very High", value: 15, color: "#E49588" },
    { name: "Extreme", value: 5, color: "#D95B4A" },
  ];

  // constants for layout
  const width = 600;
  const height = 350;
  const cx = width / 2;
  const cy = height + 27;
  const iR = 180;
  const oR = 285;

  return (
    <section className="mb-12 flex justify-start">
      <div className="flex flex-col w-fit">
        <div className="flex items-end gap-x-16 h-[350px]">
          <div className="flex flex-col justify-end">
            <span className="font-semibold tracking-wide text-gray-600 text-4xl">
              Live Recession Forecast
            </span>
            {error ? (
              <span className="text-red-500 mt-2">{error}</span>
            ) : loading ? (
              <div className="flex items-center justify-center mt-4">
                <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-[#c8bcab] rounded-full"></div>
              </div>
            ) : (
              <span className="text-8xl font-extrabold leading-none">{dialVal}%</span>
            )}
          </div>

          <PieChart width={width} height={height}>
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              cx={cx}
              cy={cy}
              startAngle={180}
              endAngle={0}
              innerRadius={oR + 1}
              outerRadius={oR + 8}
              stroke={BORDER}
              strokeWidth={8}
              fill="none"
              isAnimationActive={false}
            />

            <Pie
              data={data}
              dataKey="value"
              cx={cx}
              cy={cy}
              startAngle={180}
              endAngle={0}
              innerRadius={iR}
              outerRadius={oR}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Needle
              value={dialVal}
              cx={cx}
              cy={cy}
              iR={iR}
              oR={oR}
              color="rgba(255,255,255,0.37)"
            />
          </PieChart>


        </div>
        <div className="border-b-2 border-gray-300 w-full" />
        
      </div>
    </section>
  );
}
