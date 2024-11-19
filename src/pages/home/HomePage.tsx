import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { useQuery } from "@tanstack/react-query";
import RunnersTable from "../runners/components/RunnersTable";
import { IRunner } from "@/pages/runners/types/IRunner";
import ProjectDataTable from "../projects/components/ProjectDataTable";
import Button_More from "@/components/ButtonLoadMore";
import { Link } from "react-router-dom";
import RunnersDataTable from "../runners/components/RunnersDataTable";

export default function HomePage() {
  // API
  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(undefined, 3),
  });

  const limit = 3;
  return (
    <div className="flex flex-col gap-32">
      {/* <H1>Homepage</H1> */}
      <div>
        <H1x>Dev</H1x>
        <div className="flex flex-col gap-6">
          <div>
            <H2x>Projects</H2x>
            <ProjectDataTable limit={limit} isNav={false} />
            <MoreBtn to="/projects" />
          </div>
          <div>
            <H2x>Runners</H2x>
            <RunnersDataTable limit2={limit} isNav={false} />
            <MoreBtn to="/runners" />
          </div>
          <div>
            <H2x>Jobs</H2x>
            <Loader isLoading={runnersQuery.isLoading}>
              {/* <JobsTable jobs={[]} /> */}
              <RunnersTable runners={runnersQuery.data as IRunner[]} />
            </Loader>
            <MoreBtn to="/jobs" />
          </div>
        </div>
      </div>
      <div>
        <H1x>Ops</H1x>
        <div className="flex flex-col gap-6">
          <div>
            <H2x>Automations</H2x>
            <Loader isLoading={runnersQuery.isLoading}>
              {/* <AutomationsTable automations={[]} /> */}
              <RunnersTable runners={runnersQuery.data as IRunner[]} />
            </Loader>
            <MoreBtn to="/automations" />
          </div>
          <div>
            <H2x>Automation Types</H2x>
            <Loader isLoading={runnersQuery.isLoading}>
              <RunnersTable runners={runnersQuery.data as IRunner[]} />
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

function H1x({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={`text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-7xl w-full text-center`}
    >
      {children}
    </h1>
  );
}

function H2x({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-4xl font-bold tracking-tight scroll-m-20 first:mt-0">
      {children}
    </h2>
  );
}

function MoreBtn({ to }: { to: string }) {
  return (
    <Link to={to}>
      <Button_More className="mt-3" />
    </Link>
  );
}
