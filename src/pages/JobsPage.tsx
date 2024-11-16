import { useQuery } from "@tanstack/react-query";
import JobsTable from "../components/features/tables/JobsTable";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IJobs } from "@/lib/types/IJobs";
import { useSearchParams } from "react-router-dom";

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const sas = searchParams.get("sas") ?? "";

  const jobsQuery = useQuery({
    queryKey: ["jobs", sas],
    queryFn: async () => await RunnerModel.getJobs(sas),
    gcTime: 0,
  });

  console.log(jobsQuery);

  return (
    <main>
      <h1>Jobs</h1>
      {jobsQuery.isLoading && <div className="loading-spinner">Loading...</div>}
      {!jobsQuery.isLoading && <JobsTable jobs={jobsQuery.data as IJobs[]} />}
    </main>
  );
}
