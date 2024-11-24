import H1 from "@/components/ui/typography/H1";
import ProjectDataTable from "../../components/features/projects/ProjectDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function ProjectsPage() {
  userValidate();
  return (
    <>
      <H1>Projects</H1>
      <ProjectDataTable limit={-1} isNav={true} />
    </>
  );
}
