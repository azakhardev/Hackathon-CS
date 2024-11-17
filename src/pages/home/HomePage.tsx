import H1 from "@/components/H1";
import AutomationsTable from "@/pages/automations/components/AutomationsTable";
import JobsTable from "@/pages/jobs/components/JobsTable";
import ProjectsTable from "@/pages/projects/components/ProjectsTable";
import RunnersTable from "@/pages/runners/components/RunnersTable";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(""),
  });

  return (
    <>
      <H1>Homepage</H1>
      <h2>Projects</h2>
      <ProjectsTable projects={[]} />
      <h2>Runners</h2>
      <RunnersTable runners={[]} />
      <h2>Jobs</h2>
      <JobsTable jobs={[]} />
      <h2>Automations</h2>
      <AutomationsTable automations={[]} />
      <h2>Automation Types</h2>
    </>
  );
}
