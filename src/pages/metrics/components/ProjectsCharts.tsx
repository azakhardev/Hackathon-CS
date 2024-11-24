import { ChartCard2 } from "@/components/features/charts/ChartCard";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { useQuery } from "@tanstack/react-query";
import { FolderIcon } from "lucide-react";
import { PieStats } from "./MetricsShared";
import { useState } from "react";
import { IProject } from "@/lib/types/IProject";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/lib/types/IJobs";
import ChartSelectInput from "@/components/ChartSelectInput";
import LoadingSkeletonMetrics from "@/components/ui/LoadingSkeletonMetrics";
import {
  Chart_Gray,
  Chart_Green,
  Chart_Orange,
  Chart_Red,
} from "./ChartColors";
import { useTranslation } from "react-i18next";

const PROJECTS_CHART_CONFIG = {
  count: { label: "Count" },
  success: { label: "Successful" },
  in_progress: { label: "In Progress" },
  failed: { label: "Failed" },
  queued: { label: "Queued" },
};

export default function ProjectsCharts() {
  const { t } = useTranslation();
  const [searchOrg, setSearchOrg] = useState(" ");
  const sasQuery = useQuery({
    queryKey: ["sas"],
    queryFn: async () => await RunnerModel.getSAS(""),
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs", searchOrg],
    queryFn: async () =>
      await RunnerModel.getJobs("", undefined, undefined, undefined, "asc", {
        ...(searchOrg !== " " && { organization_eq: searchOrg }),
      }),
  });

  if (sasQuery.data && "error" in sasQuery.data)
    return <ErrorMessage errorMessage={sasQuery.data as IErrorMessage} />;
  if (jobsQuery.data && "error" in jobsQuery.data)
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;

  if (jobsQuery.error || sasQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  const projects: IProject[] = [];
  if (!sasQuery.isLoading && !jobsQuery.isLoading) {
    (sasQuery.data as string[]).forEach((s) => {
      const jobsForSAS = (jobsQuery.data as IJobs[]).filter((j) => j.SAS === s);

      if (jobsForSAS.length > 0) {
        const sasLatestJob = jobsForSAS.reduce((newest, job) => {
          return new Date(job.timestamp) > new Date(newest.timestamp)
            ? job
            : newest;
        });

        const newProject: IProject = {
          name: s,
          job: sasLatestJob,
        };
        projects.push(newProject);
      }
    });
  }
  const pStateData = createProjectsData(projects);

  return (
    <>
      {(sasQuery.isLoading || jobsQuery.isLoading) && (
        <LoadingSkeletonMetrics />
      )}
      {!sasQuery.isLoading && !jobsQuery.isLoading && (
        <ChartCard2
          header={t("translation:projects:header")}
          description={t("translation:metrics:projects_desc")}
          icon={<FolderIcon />}
          content={
            <div>
              <div className="flex gap-4 max-w-fit">
                <div className="w-20">
                  <ChartSelectInput
                    onValueChange={(e) => setSearchOrg(e)}
                    defaultValue={searchOrg}
                  />
                </div>
              </div>
              {projects.length > 0 ? (
                <CustomPieChart
                  chartConfig={PROJECTS_CHART_CONFIG}
                  chartData={pStateData}
                  innerRadius={0}
                  label={true}
                />
              ) : (
                <p>No data for selected options</p>
              )}
            </div>
          }
        />
      )}
    </>
  );
}

function createProjectsData(data: IProject[]) {
  const newData: object[] = [];
  const successJ = new PieStats("success", Chart_Green);
  const progressionJ = new PieStats("in_progress", Chart_Orange);
  const failedJ = new PieStats("failed", Chart_Red);
  const queuedJ = new PieStats("queued", Chart_Gray);

  data.forEach((p) => {
    if (p.job.state.toLowerCase() === "success") {
      successJ.count++;
    } else if (p.job.state.toLowerCase() === "failed") {
      failedJ.count++;
    } else if (p.job.state.toLowerCase() === "in_progress") {
      progressionJ.count++;
    } else {
      queuedJ.count++;
    }
  });

  newData.push(successJ, progressionJ, failedJ, queuedJ);
  return newData;
}
