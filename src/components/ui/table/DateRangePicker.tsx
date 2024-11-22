import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../Button";
import { Calendar } from "../calendar";
import { cn } from "@/lib/utils";
import format from "date-fns/format";

interface IDateRangePicker {
  dateRange: DateRange | undefined;
  setSearchDate: (dateRange: DateRange | undefined) => void;
  className?: string;
}

export default function DateRangePicker({
  dateRange,
  setSearchDate: setSearchDate,
  className,
}: IDateRangePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            `max-w-[210px] justify-start text-left font-normal ${className}`,
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "yyyy-MM-dd")} -{" "}
                {format(dateRange.to, "yyyy-MM-dd")}
              </>
            ) : (
              format(dateRange.from, "yyyy-MM-dd")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setSearchDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
