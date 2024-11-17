import H1 from "@/components/H1";
import ProjectsTable from "@/pages/projects/components/ProjectsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/lib/types/IJobs";
import { IProject } from "@/lib/types/IProject";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

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
      <div className="relative">
        <Input
          className="w-1/2 m-4 pl-9"
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
        <div className="absolute top-[9.5px] left-6 flex">
          <Search size={20}></Search>
          <p className={searchText == "" ? "text-sm ml-2" : "hidden"}>Find</p>
        </div>
      </div>
      <ProjectsTable projects={projects} />{" "}
    </>
  );
}
