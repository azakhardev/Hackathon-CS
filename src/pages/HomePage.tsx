import H1 from "@/components/features/H1";
import AutomationsTable from "@/components/features/tables/AutomationsTable";
import JobsTable from "@/components/features/tables/JobsTable";
import ProjectsTable from "@/components/features/tables/ProjectsTable";
import RunnersTable from "@/components/features/tables/RunnersTable";
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
