"use client";

import * as React from "react";
import { addDays, format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { DateRangePicker, DateRange } from "react-date-range";
import { DefinedRange } from "react-date-range";

export function DatePickerWithRange({
  className,
  dateObj = null,
  disableDate = [],
  onDateChange,
  defaultEnd = 7,
  showRangeButton = true,
}: any) {
  useEffect(() => {
    if (onDateChange) {
      onDateChange(
        format(state[0].startDate, "yyyy-MM-dd"),
        format(state[0].endDate, "yyyy-MM-dd")
      );
    }
  }, []);

  const [state, setState] = React.useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), defaultEnd),
      key: "selection",
    },
  ]);

  const handleOpenChnage = (open: any) => {
    if (!open) {
      onDateChange(
        format(state[0].startDate, "yyyy-MM-dd"),
        format(state[0].endDate, "yyyy-MM-dd")
      );
    }
  };
  return (
    <>
      <div className={cn("grid gap-2", className)}>
        <Popover onOpenChange={handleOpenChnage}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[250px] justify-start text-left font-normal w-full" +
                  !state && "text-muted-foreground",
                className
              )}
            >
              {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              {state[0]?.startDate ? (
                state[0]?.endDate ? (
                  <>
                    {format(state[0].startDate, "LLL dd, y")} -{" "}
                    {format(state[0].endDate, "LLL dd, y")}
                  </>
                ) : (
                  format(state[0].startDate, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </PopoverContent>
        </Popover>
      </div>
      {showRangeButton && (
        <div className={cn("grid gap-2", className)}>
          <Popover onOpenChange={handleOpenChnage}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal w-full" +
                    !state && "text-muted-foreground",
                  className
                )}
              >
                <span>Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DefinedRange
                onChange={(item: any) => setState([item.selection])}
                ranges={state}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
}
