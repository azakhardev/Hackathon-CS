import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import ProjectsTable from "../projects/components/ProjectsTable";
import RunnersTable from "../runners/components/RunnersTable";
import JobsTable from "../jobs/components/JobsTable";
import AutomationsTable from "../automations/components/AutomationsTable";
import H1 from "@/components/H1";
import { IRunner } from "@/lib/types/IRunner";

export default function HomePage() {
  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunnersLimit("1", "3"),
  });

  if (runnersQuery.data && "error" in runnersQuery.data) {
    const errorData = runnersQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  return (
    <>
      <H1>Homepage</H1>
      <h2>Projects</h2>
      <ProjectsTable projects={[]} />
      <h2>Runners</h2>
      {runnersQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!runnersQuery.isLoading && (
        <RunnersTable runners={runnersQuery.data as IRunner[]} />
      )}
      <h2>Jobs</h2>
      <JobsTable jobs={[]} />
      <h2>Automations</h2>
      <AutomationsTable automations={[]} />
      <h2>Automation Types</h2>
    </>
  );
}
