import ProjectsTable from "@/components/features/projects/ProjectsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/lib/types/IJobs";
import { IProject } from "@/lib/types/IProject";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "@/components/ui/table/SearchBar";
import ButtonLoadMore from "@/components/ui/table/Button_LoadMore";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { ButtonSort } from "@/components/ButtonSort";
import TableFilterNav from "@/components/ui/table/table_filter_nav";
import { ISelectItem } from "@/components/SelectInput";
import { useSearchParams } from "react-router-dom";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useTranslation } from "react-i18next";

export default function ProjectsDataTable({
  limit = 99999999,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState(searchParams.get("text") || "");
  const [displayLimit, setDisplayLimit] = useState(limit);
  const [sort, setSort] = useState({
    column: searchParams.get("sort"),
    direction: searchParams.get("order") || "asc",
  });

  const sasQuery = useQuery({
    queryKey: ["sas", searchText],
    queryFn: async () => await RunnerModel.getSAS(searchText),
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => await RunnerModel.getJobs(),
  });

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 10);
  };

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
  const storage =
    (JSON.parse(localStorage.getItem("favorite")) as string[]) ?? [];
  const projects: IProject[] = [];
  if (!jobsQuery.isLoading && !sasQuery.isLoading) {
    (sasQuery.data as string[])
      .filter((x) => x.includes(searchText.toUpperCase()))
      .forEach((s) => {
        const jobsForSAS = (jobsQuery.data as IJobs[]).filter(
          (j) => j.SAS === s
        );

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

    projects.sort((a, b) => {
      const aPriority = storage.includes(a.name) ? 0 : 1;
      const bPriority = storage.includes(b.name) ? 0 : 1;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      return sort.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  if (sort.column === "id") {
    projects.sort();
  }

  const totalProjects = projects.length;
  let displayedProjects;

  if (displayLimit === -1) {
    displayedProjects = projects;
  } else {
    displayedProjects = projects.slice(0, displayLimit);
  }

  const cols: ISelectItem[] = [
    { value: "id", content: t("translation:filters:name_sort") },
  ];

  return (
    <div>
      {isNav && (
        <div className="flex justify-between w-full gap-2 mb-4">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <div>
            <ButtonSort sort={sort} setSort={setSort} items={cols} />
          </div>
        </div>
        // <TableFilterNav
        //   left={
        //     <SearchBar searchText={searchText} setSearchText={setSearchText} />
        //   }
        //   right={<ButtonSort sort={sort} setSort={setSort} items={cols} />}
        // />
      )}
      {(sasQuery.isLoading || jobsQuery.isLoading) && <LoadingSkeleton />}

      {!sasQuery.isLoading && !jobsQuery.isLoading && (
        <ProjectsTable projects={displayedProjects} searchText={searchText} />
      )}

      {isNav && totalProjects > displayLimit && displayLimit != -1 && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}
    </div>
  );
}
