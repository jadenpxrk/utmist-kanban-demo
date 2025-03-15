"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DateSelect({
  month,
  year,
  onDateChange,
}: {
  month: number;
  year: number;
  onDateChange: (month: number, year: number) => void;
}) {
  const handleMinus = () => {
    if (month === 1) {
      onDateChange(12, year - 1);
    } else {
      onDateChange(month - 1, year);
    }
  };

  const handlePlus = () => {
    if (month === 12) {
      onDateChange(1, year + 1);
    } else {
      onDateChange(month + 1, year);
    }
  };

  const handleToday = () => {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    onDateChange(currentMonth, currentYear);
  };

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <div className="text-xl font-bold">
          {months[month - 1]} {year}
        </div>
        <Button variant="ghost" onClick={handleToday}>
          Today
        </Button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button onClick={handleMinus} size="icon" variant="ghost">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button onClick={handlePlus} size="icon" variant="ghost">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
