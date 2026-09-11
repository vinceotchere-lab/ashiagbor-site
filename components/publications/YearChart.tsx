"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export type YearCount = { year: number; count: number };

type Props = {
  data: YearCount[];
  activeYear: number | null;
  onSelect: (year: number | null) => void;
};

export default function YearChart({ data, activeYear, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-800">
          Publications per year
        </h3>
        {activeYear !== null && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs font-medium text-emerald-700 hover:underline"
          >
            Clear year filter ✕
          </button>
        )}
      </div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "#737373" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e5e5" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#737373" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(value) => [`${value} paper(s)`, ""]}
            />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              onClick={(entry) => {
                const y = (entry as unknown as { year?: number })?.year;
                if (typeof y === "number") onSelect(y === activeYear ? null : y);
              }}
              className="cursor-pointer"
            >
              {data.map((d) => (
                <Cell
                  key={d.year}
                  fill={
                    activeYear === null || activeYear === d.year
                      ? "#047857"
                      : "#d1d5db"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-xs text-neutral-400">
        Click a bar to filter by that year.
      </p>
    </div>
  );
}
