import H1 from "@/components/ui/typography/H1";
import ProjectDataTable from "../../components/features/projects/ProjectDataTable";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function ProjectsPage() {
  const { t } = useTranslation();
  userValidate();
  return (
    <>
      <H1>{t("translation:projects:header")}</H1>
      <ProjectDataTable limit={-1} isNav={true} />
    </>
  );
}
