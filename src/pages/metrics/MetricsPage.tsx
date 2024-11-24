import H1 from "@/components/ui/typography/H1";
import H2 from "@/components/ui/typography/H2";
import RunnersDataTable from "@/components/features/runners/RunnersDataTable";
import { MoreBtn } from "../home/HomePage";
import JobsChart from "./components/JobsChart";
import RunnersCharts from "./components/RunnersCharts";
import AutomationsChart from "./components/AutomationCharts";
import ProjectsCharts from "./components/ProjectsCharts";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function MetricsPage() {
  const { t } = useTranslation();

  useUserValidate();

  // const items: ISelectItem[] = [
  //   { value: " ", content: "All" },
  //   { value: "csas-dev", content: "Dev" },
  //   { value: "csas-ops", content: "Ops" },
  // ];

  return (
    <>
      <H1>{t("translation:metrics:header")}</H1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <H2>Total</H2>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <ProjectsCharts />
              <JobsChart />
            </div>
            <div className="flex flex-col justify-between gap-2 md:flex-row ">
              <RunnersCharts />
              <AutomationsChart />
            </div>
          </div>
        </div>
        <div>
          <H2>Runners</H2>
          <RunnersDataTable limit2={3} isNav={false} />
          <MoreBtn to="/runners" />
        </div>
      </div>
    </>
  );
}
