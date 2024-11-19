import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import ProjectsTable from "../projects/components/ProjectsTable";
import RunnersTable from "../runners/components/RunnersTable";
import JobsTable from "../jobs/components/JobsTable";
import AutomationsTable from "../automations/automations/AutomationsTable";
import H1 from "@/components/ui/typography/H1";
import { IRunner } from "@/pages/runners/types/IRunner";
import H2 from "@/components/ui/typography/H2";
import { IAutomation } from "../automations/_shared/IAutomation";
import { IProject } from "../projects/types/IProject";
import { Divide } from "lucide-react";
import ButtonLoadMore from "@/components/ButtonLoadmore";

export default function HomePage() {
  // API
  const projectsQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });
  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });
  const jobsQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });
  const automationsQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });
  const automationTypesQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });

  return (
    <div className="flex flex-col gap-10">
      {/* <H1>Homepage</H1> */}
      <div>
        <H1 className="w-full mb-0 text-center">Dev</H1>
        <div className="flex flex-col gap-6">
          <div>
            <H2>Projects</H2>
            <Loader isLoading={projectsQuery.isLoading}>
              {/* <ProjectsTable projects={projectsQuery.data} /> */}
              <RunnersTable runners={projectsQuery.data as IRunner[]} />
            </Loader>
            <ButtonLoadMore className="mt-2" />
          </div>
          <div>
            <H2>Runners</H2>
            <Loader isLoading={runnersQuery.isLoading}>
              <RunnersTable runners={runnersQuery.data as IRunner[]} />
            </Loader>
          </div>
          <div>
            <H2>Jobs</H2>
            <Loader isLoading={jobsQuery.isLoading}>
              {/* <JobsTable jobs={[]} /> */}
              <RunnersTable runners={jobsQuery.data as IRunner[]} />
            </Loader>
          </div>
        </div>
      </div>
      <div>
        <H1 className="w-full mb-0 text-center">Ops</H1>
        <div className="flex flex-col gap-6">
          <div>
            <H2>Automations</H2>
            <Loader isLoading={automationsQuery.isLoading}>
              {/* <AutomationsTable automations={[]} /> */}
              <RunnersTable runners={automationsQuery.data as IRunner[]} />
            </Loader>
          </div>
          <div>
            <H2>Automation Types</H2>
            <Loader isLoading={automationTypesQuery.isLoading}>
              <RunnersTable runners={automationTypesQuery.data as IRunner[]} />
            </Loader>
          </div>
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
