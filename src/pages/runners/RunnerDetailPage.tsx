import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RunnerMetricsTab from "../../components/features/runners/RunnerMetricsTab";
import { IMetrics } from "../../lib/types/IMetrics";
import { RunnerModel } from "@/lib/models/RunnerModel";
import DetailHeader, { DetailRunnerHeader } from "@/components/DetailHeader";
import "@/components/features/runners/circle.css";
import JobsDataTable from "@/components/features/jobs/JobDataTable";

export default function RunnerDetailPage() {
  const params = useParams();
  const runnerId = params.id;

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tabs"); // Extract the `tabs` parameter
  const defaultTab = tabParam || "jobs";

  const runnerQuery = useQuery({
    queryKey: ["runner", runnerId],
    queryFn: async () => await RunnerModel.getRunnerById(runnerId!),
  });

  const metricsQuery = useQuery({
    queryKey: ["runnerMetrics", runnerId],
    queryFn: async () => await RunnerModel.getMetricsByRunner(runnerId!),
  });

  if (runnerQuery.data && "error" in runnerQuery.data) {
    return <ErrorMessage errorMessage={runnerQuery.data as IErrorMessage} />;
  }

  if (metricsQuery.data && "error" in metricsQuery.data) {
    return <ErrorMessage errorMessage={metricsQuery.data as IErrorMessage} />;
  }

  const title = runnerQuery.data?.id
    ? runnerQuery.data.id.slice(-5).toUpperCase()
    : "";
  return (
    <main>
      <div>
        <DetailRunnerHeader
          section="Runner"
          title={title}
          state={runnerQuery.data?.state}
        />
        <div className="w-full">
          <Tabs defaultValue={defaultTab}>
            <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
              <TabsTrigger className="w-[100px]" value="jobs">
                Jobs
              </TabsTrigger>
              <TabsTrigger className="w-[100px]" value="metrics">
                Metrics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              <JobsDataTable limit={25} isNav={true} runnerId={runnerId} />
            </TabsContent>
            <TabsContent value="metrics">
              <RunnerMetricsTab runnerMetrics={metricsQuery.data as IMetrics} />
            </TabsContent>
          </Tabs>
        </div>
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
