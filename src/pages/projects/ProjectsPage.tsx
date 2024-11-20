import H1 from "@/components/ui/typography/H1";
import ProjectDataTable from "../../components/features/projects/ProjectDataTable";

export default function ProjectsPage() {
  return (
    <>
      <H1>Projects</H1>
      <ProjectDataTable limit={-1} isNav={true} />
    </>
  );
}
