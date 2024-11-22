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
import Throbber from "@/components/ui/Throbber";
import { ButtonSort } from "@/components/ButtonSort";
import TableFilterNav from "@/components/ui/table/table_filter_nav";
import { ISelectItem } from "@/components/SelectInput";

export default function ProjectsDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const [searchText, setSearchText] = useState("");
  const [displayLimit, setDisplayLimit] = useState(limit);
  const [sort, setSort] = useState({ column: "", direction: "asc" });

  const sasQuery = useQuery({
    queryKey: ["sas"],
    queryFn: async () => await RunnerModel.getSAS(searchText),
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => await RunnerModel.getJobs(),
  });

  if (jobsQuery.data && "error" in jobsQuery.data)
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  if (sasQuery.data && "error" in sasQuery.data)
    return <ErrorMessage errorMessage={sasQuery.data as IErrorMessage} />;

  if (jobsQuery.error || sasQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  let projects: IProject[] = [];
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
    sort.direction === "asc"
      ? projects.sort((a, b) => a.name.localeCompare(b.name))
      : projects.sort((a, b) => b.name.localeCompare(a.name));
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

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 10);
  };

  const cols: ISelectItem[] = [{ value: "id", content: "Name" }];

  return (
    <div>
      {isNav && (
        <TableFilterNav
          left={
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          }
          right={<ButtonSort sort={sort} setSort={setSort} items={cols} />}
        />
      )}
      {(sasQuery.isLoading || jobsQuery.isLoading) && <Throbber />}

      {!sasQuery.isLoading && !jobsQuery.isLoading && (
        <ProjectsTable projects={displayedProjects} searchText={searchText} />
      )}

      {isNav && totalProjects > displayLimit && displayLimit != -1 && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}
    </div>
  );
}
