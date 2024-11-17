import ProjectsTable from "@/components/features/tables/ProjectsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IJobs } from "@/lib/types/IJobs";
import { IProject } from "@/lib/types/IProject";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsPage() {
  const sasQuery = useQuery({
    queryKey: ["sas"],
    queryFn: async () => await RunnerModel.getSAS(),
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
    (sasQuery.data as string[]).forEach((s) => {
      const sasLatestJob = (jobsQuery.data as IJobs[])
        .filter((j) => j.SAS === s)
        .reduce((newest, job) => {
          return new Date(job.timestamp) > new Date(newest.timestamp)
            ? job
            : newest;
        });
      const newProject: IProject = {
        name: s,
        status: sasLatestJob.state,
        group: "Moc narocny dotaz na pamet- muzes si ho zkusit fetchnout",
        organisation: sasLatestJob.organization,
        runnerId: sasLatestJob.runner,
      };
      projects.push(newProject);
    });
  }

  console.log(projects);

  return (
    <main>
      <h2>Projekty</h2>
      <ProjectsTable projects={projects} />{" "}
    </main>
  );
}
