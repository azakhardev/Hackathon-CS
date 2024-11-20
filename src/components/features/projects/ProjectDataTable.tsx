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

export default function ProjectsDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const [searchText, setSearchText] = useState("");
  const [displayLimit, setDisplayLimit] = useState(limit);

  // API
  const sasQuery = useQuery({
    queryKey: ["sas"], //searchText - api cant filter, always same all response (cache with single key)
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
  }

  const totalProjects = projects.length;
  let displayedProjects;
  if (displayLimit === -1) {
    displayedProjects = projects;
  } else {
    displayedProjects = projects.slice(0, displayLimit);
  }
  console.log(totalProjects, displayLimit);

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 10);
  };

  return (
    <div>
      {isNav && (
        <div className="mb-4">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      )}

      <ProjectsTable projects={displayedProjects} />

      {isNav && totalProjects > displayLimit && displayLimit != -1 && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}
    </div>
  );
}
