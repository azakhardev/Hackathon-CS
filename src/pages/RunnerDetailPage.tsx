import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/lib/types/IJobs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function RunnerDetailPage() {
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
    queryFn: async () => await RunnerModel.getJobs(),
  });

  let filteredJobs: IJobs[] = [];
  if (!jobsQuery.isLoading) {
    filteredJobs = (jobsQuery.data! as IJobs[]).filter(
      (x) => x.runner === runnerId
    );
  }

  if (runnerQuery.data && "error" in runnerQuery.data) {
    return <ErrorMessage errorMessage={runnerQuery.data as IErrorMessage} />;
  }

  if (metricsQuery.data && "error" in metricsQuery.data) {
    return <ErrorMessage errorMessage={metricsQuery.data as IErrorMessage} />;
  }

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  }

  console.log("runner:", runnerQuery);
  console.log("metrics:", metricsQuery);
  console.log("jobs:", filteredJobs);

  return (
    <>
      {runnerQuery.isLoading &&
      metricsQuery.isLoading &&
      jobsQuery.isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>Runner details</div>
      )}
    </>
  );
}
