import { AutomationModel } from "@/lib/models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/automations/AutomationsTable";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IAutomationType } from "../../../lib/types/IAutomationType";
import { IAutomation } from "@/lib/types/IAutomation";
import Throbber from "@/components/ui/Throbber";
import SearchBar from "@/components/ui/table/SearchBar";
import { useState } from "react";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { calculateTimeFilter } from "@/lib/utils/calculateTimeFilter";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function AutomationsDataTable({
  limit = 9999,
  isNav = false,
}: {
  limit: number | undefined;
  isNav: boolean | undefined;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const automationsQuery = useQuery({
    queryKey: [
      "automation",
      { searchText: searchText, searchDate: searchDate },
    ],
    queryFn: async () => {
      const filters = {
        ...(searchDate &&
          searchDate.from &&
          searchDate.to == undefined && {
            last_activity_start: format(
              searchDate.from,
              "yyyy-MM-dd"
            ).toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            last_activity_gte: format(
              searchDate.from,
              "yyyy-MM-dd'T'HH:mm:ss"
            ).toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            last_activity_lte: format(
              searchDate.to,
              "yyyy-MM-dd'T'23:59:59"
            ).toString(),
          }),
      };

      return AutomationModel.getAutomations(
        searchText,
        limit,
        undefined,
        "timestamp",
        "desc",
        filters
      );
    },
  });
  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", 9999),
  });

  if (automationsQuery.data && "error" in automationsQuery.data)
    return (
      <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
    );

  if (automationsQuery.error || automationsTypesQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  // Data joining logic
  let automationsWithTypes = null;

  if (!(automationsQuery.isLoading || automationsTypesQuery.isLoading)) {
    automationsWithTypes = (automationsQuery.data as IAutomation[]).map(
      (automation: IAutomation) => {
        const matchedType = Array.isArray(automationsTypesQuery.data)
          ? automationsTypesQuery.data.find(
              (type: IAutomationType) => type.type === automation.type
            )
          : null;
        return { ...automation, type_object: matchedType || null };
      }
    );
  }

  const timeVals: ISelectItem[] = [
    { value: "2y", content: "2y" },
    { value: "1y", content: "1y" },
    { value: "6m", content: "6m" },
    { value: "3m", content: "3m" },
    { value: "1m", content: "1m" },
    { value: "14d", content: "14d" },
    { value: "7d", content: "7d" },
  ];

  return (
    <>
      <div>
        <div className="flex justify-between gap-4 mb-4">
          <SearchBar
            searchText={searchText ?? ""}
            setSearchText={setSearchText}
          />
          <div className={cn("w-1/2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !searchDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {searchDate?.from ? (
                    searchDate.to ? (
                      <>
                        {format(searchDate.from, "yyyy-MM-dd")} -{" "}
                        {format(searchDate.to, "yyyy-MM-dd")}
                      </>
                    ) : (
                      format(searchDate.from, "yyyy-MM-dd")
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
                  defaultMonth={searchDate?.from}
                  selected={searchDate}
                  onSelect={setSearchDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {automationsQuery.isLoading || automationsTypesQuery.isLoading ? (
          <Throbber />
        ) : (
          <AutomationsTable
            automations={automationsWithTypes as IAutomation[]}
            searchText={searchText}
          />
        )}
      </div>
    </>
  );
}
