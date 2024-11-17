import AutomationsTable from "@/components/features/tables/AutomationsTable";
import JobsTable from "@/components/features/tables/JobsTable";
import ProjectsTable from "@/components/features/tables/ProjectsTable";
import RunnersTable from "@/components/features/tables/RunnersTable";

export default function HomePage() {
  return (
    <>
      <h1>Homepage</h1>
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
