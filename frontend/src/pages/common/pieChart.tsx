import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = [
  "#D3D3D3",
  "#A9A9A9",
  "#808080",
  "#696969",
  "#505050",
  "#383838",
  "#202020",
  "#000000",
];

const PieChartComponent = ({ data, title }: any) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>{title}</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={(entry) => `${entry.name} (${entry.value})`}
          >
            {data.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
