import { useQuery } from "@tanstack/react-query";
import JobsTable from "./components/JobsTable";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IJobs } from "@/pages/jobs/types/IJobs";
import { useSearchParams } from "react-router-dom";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/ui/typography/H1";

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const sas = searchParams.get("sas") ?? "";

  const jobsQuery = useQuery({
    queryKey: ["jobs", sas],
    queryFn: async () => await RunnerModel.getJobs(sas),
    gcTime: 0,
  });

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  }

  if (!jobsQuery.data) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  return (
    <>
      <H1>Jobs</H1>
      {jobsQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!jobsQuery.isLoading && <JobsTable jobs={jobsQuery.data as IJobs[]} />}
    </>
  );
}
