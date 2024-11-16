import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IJobs } from "@/lib/types/IJobs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function RunnerDetailPage() {
  const params = useParams();
  const runnerId = params.id;

  const runner = useQuery({
    queryKey: ["runner", runnerId],
    queryFn: async () => await RunnerModel.getRunnerById(runnerId!),
  });

  const metrics = useQuery({
    queryKey: ["runnerMetrics", runnerId],
    queryFn: async () => await RunnerModel.getMetricsByRunner(runnerId!),
  });

  const jobs = useQuery({
    queryKey: ["runnerJobs", runnerId],
    queryFn: async () => await RunnerModel.getJobs(),
  });

  let filteredJobs: IJobs[] = [];
  if (!jobs.isLoading) {
    filteredJobs = (jobs.data! as IJobs[]).filter((x) => x.runner === runnerId);
  }

  console.log("runner:", runner);
  console.log("metrics:", metrics);
  console.log("jobs:", filteredJobs);

  return (
    <main>
      {runner.isLoading && metrics.isLoading && jobs.isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>Runner details</div>
      )}
    </main>
  );
}
