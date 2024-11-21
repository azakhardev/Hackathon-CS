import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import JobsTable from "../../components/features/jobs/JobsTable";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import format from "date-fns/format";
import SearchBar from "@/components/ui/table/SearchBar";
import { Calendar } from "@/components/ui/calendar";
import { CircleIcon } from "lucide-react";
import { RunnerModel } from "@/lib/models/RunnerModel";
import Throbber from "@/components/ui/Throbber";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISelectItem } from "@/components/SelectInput";
import SelectInput from "@/components/SelectInput";
import { AutomationModel } from "@/lib/models/AutomationModel";
import { IAutomation } from "@/lib/types/IAutomation";
import { IAutomationType } from "@/lib/types/IAutomationType";
import AutomationsTable from "../automations/automations/AutomationsTable";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState<Date>();
  const [searchState, setSearchState] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [automationsSearchText, setAutomationsSearchText] = useState("");

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tabs");
  const defaultTab = tabParam || "jobs";

  console.log(searchState);

  const jobsQuery = useQuery({
    queryKey: [
      "jobsSAS",
      id,
      searchText,
      searchDate,
      searchState,
      searchAction,
    ],
    queryFn: async () => {
      const idRegex = "[a-zA-Z0-9]{5}";

      const filters = {
        ...(id && { SAS_eq: id }),
        ...(searchDate && {
          timestamp_start: format(searchDate, "yyyy-MM-dd").toString(),
        }),
        ...(searchState &&
          searchState.trim() != "" && { state_eq: searchState }),
        ...(searchAction &&
          searchAction.trim() != "" && {
            runner_like:
              searchAction != "none"
                ? `${searchAction}-${idRegex}`
                : searchAction,
          }),
      };

      return RunnerModel.getJobs(
        searchText,
        undefined,
        undefined,
        undefined,
        undefined,
        filters
      );
    },
  });

  const automationsQuery = useQuery({
    queryKey: ["automationsSAS", id, automationsSearchText],
    queryFn: async () => {
      const filters = {
        ...(id && { sas_eq: id }),
      };

      return AutomationModel.getAutomations(
        automationsSearchText,
        undefined,
        undefined,
        undefined,
        undefined,
        filters
      );
    },
  });

  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", 9999),
  });

  if (jobsQuery.data && "error" in jobsQuery.data)
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;

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

  const actionsVals: ISelectItem[] = [
    { value: "csas-dev-csas-linux", content: "Building" },
    { value: "csas-dev-csas-linux-test", content: "Testing" },
    { value: "csas-ops-csas-linux", content: "Deploying to dev" },
    { value: "csas-ops-csas-linux-test", content: "Deploying to prod" },
  ];
  const statesVals: ISelectItem[] = [
    { value: "success", content: <StateItem title="Success" color="green" /> },
    { value: "queued", content: <StateItem title="Queued" color="gray" /> }, // prettier-ignore
    { value: "in_progress", content: <StateItem title="In Progress" color="yellow" /> }, // prettier-ignore
    { value: "failed", content: <StateItem title="Failed" color="red" /> },
  ];

  return (
    <main>
      <div>
        <div className="h-[10dvh] border-b-2 flex items-center mb-4">
          <h2 className="text-[24px] ml-10 font-bold">{`Project > ${
            id?.split("_")[1]
          }
          `}</h2>
        </div>
        <div className="p-10 w-full h-[80dvh]">
          <Tabs defaultValue={defaultTab}>
            <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
              <TabsTrigger className="w-[100px]" value="jobs">
                Jobs
              </TabsTrigger>
              <TabsTrigger className="w-[100px]" value="automations">
                Automations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              <div className="flex justify-between gap-4 mb-4">
                <SearchBar
                  searchText={searchText ?? ""}
                  setSearchText={setSearchText}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !searchDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {searchDate ? (
                        format(searchDate, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchDate}
                      onSelect={setSearchDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <SelectInput
                  placeholder="All actions"
                  items={actionsVals}
                  onValueChange={(e) => setSearchAction(e)}
                />
                <SelectInput
                  placeholder="All States"
                  items={statesVals}
                  onValueChange={(e) => setSearchState(e)}
                />
              </div>
              {jobsQuery.isLoading ? (
                <Throbber />
              ) : jobsQuery.data?.length === 0 ? (
                <h3>Nebyly nalezeny žádné jobs</h3>
              ) : (
                <JobsTable jobs={jobsQuery.data} searchText={searchText} />
              )}
            </TabsContent>
            <TabsContent value="automations">
              {automationsQuery.isLoading || automationsTypesQuery.isLoading ? (
                <Throbber />
              ) : jobsQuery.data?.length === 0 ? (
                <h3>Nebyly nalezeny žádné automatizace</h3>
              ) : (
                <AutomationsTable
                  automations={automationsWithTypes as IAutomation[]}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

function StateItem({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex flex-row items-center">
      <CircleIcon size={8} className={`mr-2 fill-state_${color} stroke-none`} />
      <span>{title}</span>
    </div>
  );
}
