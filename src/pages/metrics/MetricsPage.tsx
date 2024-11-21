import H1 from "@/components/ui/typography/H1";
import { useQuery } from "@tanstack/react-query";
import { AutomationModel } from "../../lib/models/AutomationModel";
import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import MetricsPageCharts from "../../components/features/metrics/MetricsPageCharts";
import { IJobs } from "../../lib/types/IJobs";
import { IRunner } from "../../lib/types/IRunner";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { IAutomation } from "@/lib/types/IAutomation";

export default function MetricsPage() {
  const [dateStart, setDateStart] = useState<Date>();
  const automationsQuery = useQuery({
    queryKey: ["automations", dateStart],
    queryFn: async () => {
      const filters = {
        ...(dateStart && { last_activity_gte: dateStart.toISOString() }),
      };

      return await AutomationModel.getAutomations(
        undefined,
        undefined,
        undefined,
        undefined,
        "asc",
        filters
      );
    },
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs", dateStart],
    queryFn: async () => {
      const filters = {
        ...(dateStart && { timestamp_gte: dateStart.toISOString() }),
      };
      return await RunnerModel.getJobs(
        undefined,
        undefined,
        undefined,
        undefined,
        "asc",
        filters
      );
    },
  });

  const runnersQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      return await RunnerModel.getRunners();
    },
  });

  if (automationsQuery.error || jobsQuery.error || runnersQuery.error) {
  }

  return (
    <>
      <H1>Metrics</H1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !dateStart && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateStart ? (
              format(dateStart, "yyyy-MM-dd")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateStart}
            onSelect={setDateStart}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <ul>
        <li>Stránka s grafy </li>
        <li>
          Kolik runnerů je v jakém stavu + Např. u kterých runnerů dochází
          uložiště (jen alert) a když tak to dělat nemusíme
        </li>
        <li>
          Zobrazovat počet logů automatizací v určitém intervalu, tak by se
          mohla poznat jejich zatíženost
        </li>
      </ul>
      {(jobsQuery.isLoading ||
        automationsQuery.isLoading ||
        runnersQuery.isLoading) && (
        <div className="loader-wrap h-100%">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!jobsQuery.isLoading &&
        !automationsQuery.isLoading &&
        !runnersQuery.isLoading && (
          <MetricsPageCharts
            automationsData={automationsQuery.data as IAutomation[]}
            runnersData={runnersQuery.data as IRunner[]}
            jobsData={jobsQuery.data as IJobs[]}
          />
        )}
    </>
  );
}
