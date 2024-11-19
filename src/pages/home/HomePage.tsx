import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { useQuery } from "@tanstack/react-query";
import RunnersTable from "../runners/components/RunnersTable";
import H1 from "@/components/ui/typography/H1";
import { IRunner } from "@/pages/runners/types/IRunner";
import H2 from "@/components/ui/typography/H2";
import ProjectDataTable from "../projects/components/ProjectDataTable";
import ButtonLoadMore from "@/components/ButtonLoadmore";
import { Link } from "react-router-dom";

export default function HomePage() {
  // API
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
  const limit = 3;
  return (
    <div className="flex flex-col gap-10">
      {/* <H1>Homepage</H1> */}
      <div>
        <H1 className="w-full mb-0 text-center">Dev</H1>
        <div className="flex flex-col gap-6">
          <div>
            <H2>Projects</H2>
            <ProjectDataTable limit={limit} isNav={false} />
            <MoreBtn to="/projects" />
          </div>
          <div>
            <H2>Runners</H2>
            <Loader isLoading={runnersQuery.isLoading}>
              <RunnersTable runners={runnersQuery.data as IRunner[]} />
            </Loader>
            <MoreBtn to="/runners" />
          </div>
          <div>
            <H2>Jobs</H2>
            <Loader isLoading={jobsQuery.isLoading}>
              {/* <JobsTable jobs={[]} /> */}
              <RunnersTable runners={jobsQuery.data as IRunner[]} />
            </Loader>
            <MoreBtn to="/jobs" />
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
            <MoreBtn to="/automations" />
          </div>
          <div>
            <H2>Automation Types</H2>
            <Loader isLoading={automationTypesQuery.isLoading}>
              <RunnersTable runners={automationTypesQuery.data as IRunner[]} />
            </Loader>
            <MoreBtn to="/automationTypes" />
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

function MoreBtn({ to }: { to: string }) {
  return (
    <Link to={to}>
      <ButtonLoadMore className="mt-3" />
    </Link>
  );
}
