import ProjectDataTable from "../../components/features/projects/ProjectDataTable";
import Button_More from "@/components/ButtonLoadMore";
import { Link } from "react-router-dom";
import RunnersDataTable from "../../components/features/runners/RunnersDataTable";
import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import AutomationsDataTable from "../automations/automations/AutomationsDataTable";
import JobsDataTable from "@/components/features/jobs/JobDataTable";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/lib/hooks/use-mobile";

export default function HomePage() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const limit = 3;
  useUserValidate();

  return (
    <div className="flex flex-col gap-32">
      {/* <H1>Homepage</H1> */}
      <div>
        <H1x>{t("translation:homepage:dev_header")}</H1x>
        <div className="flex flex-col gap-6">
          <div>
            <H2x>{t("translation:homepage:projects_header")}</H2x>
            <ProjectDataTable limit={limit} isNav={false} />
            <MoreBtn to="/projects" />
          </div>
          <div>
            <H2x>{t("translation:homepage:runners_header")}</H2x>
            <RunnersDataTable limit2={limit} isNav={false} />
            <MoreBtn to="/runners" />
          </div>
          <div>
            <H2x>{t("translation:homepage:jobs_header")}</H2x>
            <JobsDataTable limit={limit} isNav={false} />
            <MoreBtn to="/jobs" />
          </div>
        </div>
      </div>
      <div>
        <H1x>{t("translation:homepage:ops_header")}</H1x>
        <div className="flex flex-col gap-6">
          <div>
            <H2x>{t("translation:homepage:automations_header")}</H2x>
            <AutomationsDataTable limit={limit} isNav={false} />
            <MoreBtn to="/automations" />
          </div>
          {!isMobile && (
            <div>
              <H2x>{t("translation:homepage:automation_types_header")}</H2x>
              <AutomationTypesDataTable limit={limit} />
              <MoreBtn to="/automationTypes" />
            </div>
          )}
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
      //className={`text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-7xl w-full text-center`}
      className={`text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl w-full text-center uppercase border-b-2 pb-2 mb-5`}
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
