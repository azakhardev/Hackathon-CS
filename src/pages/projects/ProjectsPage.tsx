import H1 from "@/components/ui/typography/H1";
import ProjectsTable from "@/pages/projects/components/ProjectsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/pages/jobs/types/IJobs";
import { IProject } from "@/pages/projects/types/IProject";
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

  if (!jobsQuery.data && !jobsQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if (!jobsQuery.isLoading && !sasQuery.isLoading) {
    console.log(jobsQuery.data);
    console.log(sasQuery.data);

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

  console.log(projects);

  return (
    <>
      <H1>Projects</H1>
      <div className="mb-4">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <ProjectsTable projects={projects} />{" "}
    </>
  );
}
