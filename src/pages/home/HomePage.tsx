import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import ProjectsTable from "../projects/components/ProjectsTable";
import RunnersTable from "../runners/components/RunnersTable";
import JobsTable from "../jobs/components/JobsTable";
import AutomationsTable from "../automations/components/AutomationsTable";
import H1 from "@/components/ui/typography/H1";
import { IRunner } from "@/pages/runners/types/IRunner";
import H2 from "@/components/ui/typography/H2";

export default function HomePage() {
  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunnersLimit("1", "3"),
  });

  if (runnersQuery.data && "error" in runnersQuery.data) {
    const errorData = runnersQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  if (!runnersQuery.data && !runnersQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* <H1>Homepage</H1> */}
      <div className="flex flex-col gap-6">
        <H1 className="w-full text-center">Dev</H1>
        <div>
          <H2>Projects</H2>
          <Loader isLoading={runnersQuery.isLoading}>
            {/* <ProjectsTable projects={[]} /> */}
            <RunnersTable runners={runnersQuery.data as IRunner[]} />
          </Loader>
        </div>
        <div>
          <H2>Runners</H2>
          <Loader isLoading={runnersQuery.isLoading}>
            <RunnersTable runners={runnersQuery.data as IRunner[]} />
          </Loader>
        </div>
        <div>
          <H2>Jobs</H2>
          <Loader isLoading={runnersQuery.isLoading}>
            {/* <JobsTable jobs={[]} /> */}
            <RunnersTable runners={runnersQuery.data as IRunner[]} />
          </Loader>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <H1 className="w-full text-center">Ops</H1>
        <div>
          <H2>Automations</H2>
          <Loader isLoading={runnersQuery.isLoading}>
            {/* <AutomationsTable automations={[]} /> */}
            <RunnersTable runners={runnersQuery.data as IRunner[]} />
          </Loader>
        </div>
        <div>
          <H2>Automation Types</H2>
          <Loader isLoading={runnersQuery.isLoading}>
            <RunnersTable runners={runnersQuery.data as IRunner[]} />
          </Loader>
        </div>
      </div>
    </div>
  );
}

export function Loader({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}): JSX.Element {
  return (
    <>
      {isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
