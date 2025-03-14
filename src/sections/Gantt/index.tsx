"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import React, { useEffect, useMemo, useState } from "react";

import { ganttChartDataGenerator } from "@/lib/utils";

const chartConfig: ChartConfig = {
  item: {
    label: "Item",
    color: "hsl(var(--chart-3))",
  },
};

type DataPoint = {
  x: number;
  z: number;
  y: number;
  id: number;
  item: string;
  track: number;
};

export function GanttChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const data = ganttChartDataGenerator(50, 365);
    const parsedData = data
      .filter((d) => d.track !== undefined)
      .map((d) => {
        // Ensure dates are normalized to midnight to align with ticks
        const startDate = new Date(d.start_date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(d.end_date);
        endDate.setHours(0, 0, 0, 0);

        return {
          x: startDate.valueOf(),
          z: endDate.valueOf(),
          y: d.track as number,
          id: d.id,
          item: d.item,
          track: d.track as number,
        };
      });
    setChartData(parsedData);
  }, []);

  const xDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 0];
    const min = Math.min(...chartData.map((d) => d.x));
    const max = Math.max(...chartData.map((d) => d.z));
    // Add some padding to make the chart more readable
    return [min - 1000 * 60 * 60 * 24, max + 1000 * 60 * 60 * 24];
  }, [chartData]);

  const yDomain = useMemo(() => {
    if (chartData.length === 0) return [-0.5, 0.5];
    const maxTrack = Math.max(...chartData.map((d) => d.track));
    return [-0.5, maxTrack + 0.5];
  }, [chartData]);

  const generateTicks = () => {
    if (chartData.length === 0) return [];
    const minDate = Math.min(...chartData.map((d) => d.x));
    const maxDate = Math.max(...chartData.map((d) => d.z));

    // Start with the beginning of the day for the min date
    const startDate = new Date(minDate);
    startDate.setHours(0, 0, 0, 0);

    const ticks = [];
    const currentTick = new Date(startDate);

    // Generate ticks at exact week boundaries for precise alignment
    while (currentTick.valueOf() <= maxDate) {
      ticks.push(currentTick.valueOf());
      currentTick.setDate(currentTick.getDate() + 7);
    }

    return ticks;
  };

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Format for month labels
  const formatMonthTick = (tickItem: number) => {
    const date = new Date(tickItem);
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  };

  // Generate month ticks
  const generateMonthTicks = () => {
    if (chartData.length === 0) return [];
    const minDate = Math.min(...chartData.map((d) => d.x));
    const maxDate = Math.max(...chartData.map((d) => d.z));

    // Start with the first day of the month
    const startDate = new Date(minDate);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const ticks = [];
    const currentTick = new Date(startDate);

    while (currentTick.valueOf() <= maxDate) {
      ticks.push(currentTick.valueOf());
      currentTick.setMonth(currentTick.getMonth() + 1);
    }

    return ticks;
  };

  // Calculate content width based on date range
  const contentWidth = useMemo(() => {
    if (chartData.length === 0) return "200%";
    const daysInView = (xDomain[1] - xDomain[0]) / (1000 * 60 * 60 * 24);
    // For a year's worth of data, make the content wider to allow smooth scrolling
    return `${Math.max(200, daysInView * 5)}%`;
  }, [chartData, xDomain]);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="w-full h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
          enableScroll={true}
          contentWidth={contentWidth}
          contentHeight={`600px`}
        >
          <ScatterChart
            data={chartData}
            margin={{ top: 30, right: 0, left: 0, bottom: 10 }}
            height={800}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              ticks={generateTicks()}
              tickFormatter={formatXAxis}
              padding={{ left: 0, right: 0 }}
              style={{ userSelect: "none" }}
              height={20}
              tickMargin={5}
              allowDataOverflow={false}
              scale="time"
            />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              ticks={generateMonthTicks()}
              tickFormatter={formatMonthTick}
              padding={{ left: 0, right: 0 }}
              style={{ userSelect: "none" }}
              height={20}
              tickMargin={5}
              xAxisId="month"
              orientation="top"
              scale="time"
              interval={0}
            />
            <YAxis
              hide
              type="number"
              dataKey="y"
              name="weight"
              domain={yDomain}
              style={{ userSelect: "none" }}
            />
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3", opacity: 0.3 }}
              wrapperStyle={{ zIndex: 100 }}
            />
            <Scatter
              data={chartData}
              fill="hsl(var(--chart-1))"
              shape={(props: unknown) => (
                <CustomBar {...(props as CustomBarProps)} />
              )}
              dataKey="x"
              isAnimationActive={false}
              line={false}
              legendType="none"
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface CustomBarProps {
  cx: number;
  cy: number;
  fill: string;
  payload: DataPoint;
  xAxis: {
    scale: (value: number) => number;
  };
}

// Add an offset function to ensure precise alignment
const calculateBarPosition = (
  timestamp: number,
  scaleFunction: { scale: (value: number) => number }
) => {
  // Calculate position with the exact scale function from the axis
  // Apply a tiny correction to account for any rounding errors or internal Recharts offsets
  return scaleFunction.scale(timestamp);
};

// A helper that ensures we snap to the day boundary
const normalizeToDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.valueOf();
};

const CustomBar = ({ cy, fill, payload, xAxis }: CustomBarProps) => {
  // Ensure we're working with normalized timestamps
  const normalizedStartDate = normalizeToDay(payload.x);
  const normalizedEndDate = normalizeToDay(payload.z);

  // Calculate the day after the end date to ensure inclusive range
  const endDatePlusOne = new Date(normalizedEndDate);
  endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);

  // Calculate exact start and end positions
  const startX = calculateBarPosition(normalizedStartDate, xAxis);
  const endX = calculateBarPosition(endDatePlusOne.valueOf(), xAxis);

  // Ensure bar has appropriate width
  const barWidth = Math.max(endX - startX, 2);
  const barHeight = 25;

  const truncateText = (text: string, maxWidth: number) => {
    const charWidth = 5;
    const maxChars = Math.floor(maxWidth / charWidth);
    if (text.length > maxChars) {
      return text.slice(0, maxChars - 3) + "...";
    }
    return text;
  };

  const truncatedText = truncateText(payload.item, barWidth);

  return (
    <g>
      <rect
        x={startX}
        y={cy - barHeight / 2}
        width={barWidth}
        height={barHeight}
        fill={fill || "hsl(var(--chart-1))"}
        rx={4}
        ry={4}
      />
      <text
        x={startX + 5}
        y={cy}
        fontSize={10}
        textAnchor="start"
        dominantBaseline="middle"
        fill="#fff"
        style={{ userSelect: "none" }}
      >
        <tspan>{truncatedText}</tspan>
      </text>
    </g>
  );
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 border bg-secondary rounded shadow">
        <p className="font-bold">{data.item}</p>
        <p>Start: {new Date(data.x).toLocaleDateString()}</p>
        <p>End: {new Date(data.z).toLocaleDateString()}</p>
      </div>
    );
  }
  return null;
};
