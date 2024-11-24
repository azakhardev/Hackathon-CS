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
import { useTranslation } from "react-i18next";

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
  const handleDateChange = (newDateRange: DateRange | undefined) => {
    const url = new URL(window.location.href);
    if (newDateRange?.from) {
      url.searchParams.set("from", format(newDateRange.from, "yyyy-MM-dd"));
    } else {
      url.searchParams.delete("from");
    }
    if (newDateRange?.to) {
      url.searchParams.set("to", format(newDateRange.to, "yyyy-MM-dd"));
    } else {
      url.searchParams.delete("to");
    }
    window.history.pushState({}, "", url);

    setSearchDate(newDateRange);
  };

  const { t } = useTranslation();

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
            <span className="truncate">{t("translation:filters:date")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleDateChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
