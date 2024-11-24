import H1 from "@/components/ui/typography/H1";
import { useQuery } from "@tanstack/react-query";
import { AutomationModel } from "../../lib/models/AutomationModel";
import { useState } from "react";
import { format } from "date-fns";
import MetricsPageCharts from "../../components/features/metrics/MetricsPageCharts";
import { IJobs } from "../../lib/types/IJobs";
import { IRunner } from "../../lib/types/IRunner";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Throbber from "@/components/ui/Throbber";
import H2 from "@/components/ui/typography/H2";
import RunnersDataTable from "@/components/features/runners/RunnersDataTable";
import { MoreBtn } from "../home/HomePage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import JobsChart from "./components/JobsChart";
import RunnersCharts from "./components/RunnersCharts";
import AutomationsChart from "./components/AutomationCharts";
import ProjectsCharts from "./components/ProjectsCharts";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function MetricsPage() {
  const { t } = useTranslation()

  userValidate();

  let items: ISelectItem[] = [
    { value: " ", content: "All" },
    { value: "csas-dev", content: "Dev" },
    { value: "csas-ops", content: "Ops" },
  ];

  return (
    <>
      <H1>{t('translation:metrics:header')}</H1>
      <div className="flex flex-col gap-8">
        <H2>Total</H2>
        <div className="flex flex-col">
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
