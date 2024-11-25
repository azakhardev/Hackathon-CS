import { useParams } from "react-router-dom";
import LogsDataTable from "@/components/features/automations/detail/LogsDataTable";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";
import H1 from "@/components/ui/typography/H1";

export default function AutomationDetailPage() {
  useUserValidate();
  const { t } = useTranslation();
  const params = useParams();
  const automationId = params.id;
  if (!automationId) throw new Error("Automation ID is missing");

  return (
    <>
      <H1>{t("translation:automations:detail_header")}</H1>
      <LogsDataTable automationId={automationId} />
    </>
  );
}
