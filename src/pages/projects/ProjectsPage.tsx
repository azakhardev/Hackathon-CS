import H1 from "@/components/ui/typography/H1";
import ProjectsTable from "@/pages/projects/components/ProjectsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/pages/jobs/types/IJobs";
import { IProject } from "@/lib/types/IProject";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "@/components/ui/table/SearchBar";

export default function ProjectsPage() {
  const [searchText, setSearchText] = useState("");

  const sasQuery = useQuery({
    queryKey: ["sas", searchText],
    queryFn: async () => await RunnerModel.getSAS(searchText),
    gcTime: 0,
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => await RunnerModel.getJobs(),
    gcTime: 0,
  });

  let projects: IProject[] = [];

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  }

  if (sasQuery.data && "error" in sasQuery.data) {
    return <ErrorMessage errorMessage={sasQuery.data as IErrorMessage} />;
  }

  if (!jobsQuery.isLoading && !sasQuery.isLoading) {
    (sasQuery.data as string[])
      .filter((x) => x.includes(searchText.toUpperCase()))
      .forEach((s) => {
        const sasLatestJob = (jobsQuery.data as IJobs[])
          .filter((j) => j.SAS === s)
          .reduce((newest, job) => {
            return new Date(job.timestamp) > new Date(newest.timestamp)
              ? job
              : newest;
          });
        const newProject: IProject = {
          name: s,
          job: sasLatestJob,
        };
        projects.push(newProject);
      });
  }

  console.log(projects);

  return (
    <>
      <H1>Projekty</H1>
      <div className="mb-4">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <ProjectsTable projects={projects} />{" "}
    </>
  );
}
