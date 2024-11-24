import { useParams } from "react-router-dom";
import H2 from "@/components/ui/typography/H2";
import LogsDataTable from "@/components/features/automations/detail/LogsDataTable";
import DetailHeader from "@/components/DetailHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function AutomationDetailPage() {
  userValidate();
  const { t } = useTranslation()
  const params = useParams();
  const automationId = params.id;
  if (!automationId) throw new Error("Automation ID is missing");

  return (
    <>
      <DetailHeader section={t('translation:automations:header')} title={automationId.slice(-5)} />
      <H2>{t('translation:automations:detail_header')}</H2>
      <LogsDataTable automationId={automationId} />
    </>
  );
}
