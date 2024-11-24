import H1 from "@/components/ui/typography/H1";
import JobsDataTable from "../../components/features/jobs/JobDataTable";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function JobsPage() {
  useUserValidate();
  const { t } = useTranslation();
  return (
    <>
      <H1>{t("translation:jobs:header")}</H1>
      <JobsDataTable limit={25} isNav={true} />
    </>
  );
}
