import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import JobsTable from "../jobs/components/JobsTable";
import { IJobs } from "../jobs/types/IJobs";
import RunnerMetricsTab from "./RunnerMetricsTab";
import { IMetrics } from "../metrics/types/IMetrics";
import SearchBar from "@/components/ui/table/SearchBar";
import { CircleIcon } from "lucide-react";
import SelectInput, { ISelectItem } from "@/components/SelectInput";

export default function RunnerDetailPage() {
  const [limit, setLimit] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchState, setSearchState] = useState("");

  const params = useParams();
  const runnerId = params.id;

  function StateItem({ title, color }: { title: string; color: string }) {
    return (
      <div className="flex flex-row items-center">
        <CircleIcon
          size={8}
          className={`mr-2 fill-state_${color} stroke-none`}
        />
        <span>{title}</span>
      </div>
    );
  }

  const runnerQuery = useQuery({
    queryKey: ["runner", runnerId],
    queryFn: async () => await RunnerModel.getRunnerById(runnerId!),
  });

  const metricsQuery = useQuery({
    queryKey: ["runnerMetrics", runnerId],
    queryFn: async () => await RunnerModel.getMetricsByRunner(runnerId!),
  });

  const jobsQuery = useQuery({
    queryKey: [
      "jobsQuery",
      {
        search: searchText,
        searchAction: searchAction,
        searchState: searchState,
      },
    ],
    queryFn: async () => {
      const filters = {
        ...(searchText && searchText.trim() !== "" && { id_like: searchText }),
        ...(searchAction &&
          searchAction.trim() !== "" && { runner_like: searchAction }),
        ...(searchState &&
          searchState.trim() !== "" && { state_eq: searchState }),
      };

      return RunnerModel.getJobs(
        runnerId,
        99999999,
        undefined,
        "state",
        "asc",
        filters
      );
    },
  });

  if (runnerQuery.data && "error" in runnerQuery.data) {
    return <ErrorMessage errorMessage={runnerQuery.data as IErrorMessage} />;
  }

  if (metricsQuery.data && "error" in metricsQuery.data) {
    return <ErrorMessage errorMessage={metricsQuery.data as IErrorMessage} />;
  }

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
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
        <div className="h-[10dvh] border-b-2 flex items-center">
          <h2 className="text-[24px] ml-10 font-bold">{`Runner > ${
            runnerQuery.data?.id?.split("-")[5]
          }`}</h2>
        </div>
        <div className="p-10 w-full h-[80dvh]">
          <Tabs defaultValue="jobs">
            <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
              <TabsTrigger className="w-[100px]" value="jobs">
                Jobs
              </TabsTrigger>
              <TabsTrigger className="w-[100px]" value="metrics">
                Metrics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              <div className="flex justify-between gap-4 mb-4">
                <SearchBar
                  searchText={searchText ?? ""}
                  setSearchText={setSearchText}
                />
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
              {runnerQuery.isLoading ||
              metricsQuery.isLoading ||
              jobsQuery.isLoading ? (
                <div className="loader-wrap">
                  <div className="loading-spinner"></div>
                </div>
              ) : jobsQuery.data?.length === 0 ? (
                <h3>Nebyly nalezeny žádné jobs</h3>
              ) : (
                <JobsTable jobs={jobsQuery.data as IJobs[]} />
              )}
            </TabsContent>
            <TabsContent value="metrics">
              <RunnerMetricsTab runnerMetrics={metricsQuery.data as IMetrics} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="m-4">
        <Button
          className={
            jobsQuery.data && jobsQuery.data.length >= limit
              ? "w-full"
              : "hidden"
          }
          variant="outline"
          onClick={() => {
            setLimit((oldLim) => oldLim + 5);
          }}
        >
          Load more
        </Button>
      </div>
    </main>
  );
}

{
  /* <Table>
                    <TableBody>
                      {jobsQuery.data?.map((jobs, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <h3>{jobs.id}</h3>
                              <p className="text-gray-500 text-[12px]">
                                {(() => {
                                  const prod = `${jobs.runner.split("-")[1]}-${
                                    jobs.runner.split("-")[2]
                                  }`;
                                  const action = jobs.runner
                                    .split("-")
                                    .slice(3, -1)
                                    .join("-");

                                  switch (`${prod}-${action}`) {
                                    case "csas-dev-csas-linux":
                                      return "build aplikace";
                                    case "csas-dev-csas-linux-test":
                                      return "testování aplikace";
                                    case "csas-ops-csas-linux":
                                      return "Deploy do neprodukčního prostředí";
                                    case "csas-ops-csas-linux-test":
                                      return "Deploy do produkčního prostředí";
                                    default:
                                      return "Unknown action";
                                  }
                                })()}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Table_cel_state
                              title={jobs.state}
                              text={`(${formatDistanceToNow(
                                new Date(jobs.timestamp),
                                { addSuffix: true }
                              )})`}
                              type={jobs.state}
                            />
                          </TableCell>
                          <TableCell>{jobs.SAS}</TableCell>
                          <TableCell>{jobs.runner.split("-")[5]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table> */
}
