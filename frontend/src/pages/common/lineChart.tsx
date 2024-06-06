import { Button } from "@/src/components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  //   Tooltip,
} from "../../components/ui/tooltip";
import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const LineChartComponent = ({ data = [], keys = [] }: any) => {
  //   const [localData, setLocalData] = useState([]);

  //   useEffect(() => {
  //     setLocalData(data);
  //   }, [data]);
  return (
    <ResponsiveContainer height={400} minWidth={200}>
      <LineChart
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend />/
        <Line
          type="monotone"
          dataKey="daily"
          stroke={"hsl(222.2 47.4% 11.2%)"}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="average"
          stroke={"hsl(222.2 47.4% 11.2%)"}
          style={{ opacity: ".25" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { name, daily, average, dailylable, averagelable, type } =
      payload[0].payload;

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-gray-800 font-semibold">{name}</p>
        <p className="text-gray-600">
          {averagelable}: {average} {type == "table" && " Mins"}
        </p>
        <p className="text-gray-600">
          {dailylable}: {daily}
        </p>
      </div>
    );
  }

  return null;
};
