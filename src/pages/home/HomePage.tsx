import ProjectDataTable from "../../components/features/projects/ProjectDataTable";
import Button_More from "@/components/ButtonLoadMore";
import { Link, redirect } from "react-router-dom";
import RunnersDataTable from "../../components/features/runners/RunnersDataTable";
import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import AutomationsDataTable from "../automations/automations/AutomationsDataTable";
import JobsDataTable from "@/components/features/jobs/JobDataTable";
import { userValidate } from "@/lib/utils/validateUser";

export default function HomePage() {
  const limit = 3;

  userValidate();

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
            <JobsDataTable limit={limit} isNav={false} />
            <MoreBtn to="/jobs" />
          </div>
        </div>
      </div>
      <div>
        <H1x>Ops</H1x>
        <div className="flex flex-col gap-6">
          <div>
            <H2x>Automations</H2x>
            <AutomationsDataTable limit={limit} isNav={false} />
            <MoreBtn to="/automations" />
          </div>
          <div>
            <H2x>Automation Types</H2x>
            <AutomationTypesDataTable limit={limit} isNav={false} />
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

export function MoreBtn({ to }: { to: string }) {
  return (
    <Link to={to}>
      <Button_More className="mt-3" />
    </Link>
  );
}
