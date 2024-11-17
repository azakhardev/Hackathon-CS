import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { Button } from "@/components/ui/Button";
import RunnerDetailJobsFilter from "./components/RunnerDetailJobsFilters";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export default function RunnerDetailPage() {
  const [limit, setLimit] = useState(5);

  const params = useParams();
  const runnerId = params.id;

  const runnerQuery = useQuery({
    queryKey: ["runner", runnerId],
    queryFn: async () => await RunnerModel.getRunnerById(runnerId!),
  });

  const metricsQuery = useQuery({
    queryKey: ["runnerMetrics", runnerId],
    queryFn: async () => await RunnerModel.getMetricsByRunner(runnerId!),
  });

  const jobsQuery = useQuery({
    queryKey: ["runnerJobs", runnerId],
    queryFn: async () => await RunnerModel.getJobs(runnerId),
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

  let showRunners = jobsQuery.data?.slice(0, limit);

  console.log(jobsQuery.data)

  return (
    <main>
      {runnerQuery.isLoading &&
      metricsQuery.isLoading &&
      jobsQuery.isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        runnerQuery.data && (
          <div>
            <div className="h-[10dvh] border-b-2 flex items-center">
              <h2 className="text-[24px] ml-10 font-bold">{`Runner > ${
                runnerQuery.data.id?.split("-")[5]
              }`}</h2>
            </div>
            <div className="p-10 w-full h-[80dvh]">
              <Tabs defaultValue="jobs">
                <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
                  <TabsTrigger className="w-[100px]" value="jobs">
                    Jobs
                  </TabsTrigger>
                  <TabsTrigger className="w-[100px]" value="Metrics">
                    Metrics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="jobs">
                  <RunnerDetailJobsFilter />
                  <Table>
                    <TableBody>
                      {showRunners?.map(
                        (jobs, index) =>
                          index < 5 && (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="items-center">
                                  <p>{jobs.id}</p>
                                  <p className="text-gray-400 text-[10px]">
                                    {(() => {
                                      const prod = `${
                                        jobs.runner.split("-")[1]
                                      }-${jobs.runner.split("-")[2]}`;
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
                                <div>
                                    <p>{jobs.state}</p>
                                    <p className="text-gray-400 text-[10px]">({formatDistanceToNow(new Date(jobs.timestamp), {addSuffix: true})})</p>
                                </div>
                              </TableCell>
                              <TableCell>{jobs.SAS}</TableCell>

                              <TableCell>{jobs.runner.split("-")[5]}</TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                  <Button
          className={jobsQuery.data && jobsQuery.data.length >= limit ? "w-full" : "hidden"}
          variant="outline"
          onClick={() => setLimit(limit + 25)}
        >
          Load more
        </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )
      )}
    </main>
  );
}
