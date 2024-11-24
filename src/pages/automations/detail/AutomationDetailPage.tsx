import { useParams } from "react-router-dom";
import H2 from "@/components/ui/typography/H2";
import LogsDataTable from "@/components/features/automations/detail/LogsDataTable";
import DetailHeader from "@/components/DetailHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";
import H1 from "@/components/ui/typography/H1";

export default function AutomationDetailPage() {
  userValidate();
  const { t } = useTranslation();
  const params = useParams();
  const automationId = params.id;
  if (!automationId) throw new Error("Automation ID is missing");

  return (
    <>
      {/* <DetailHeader section={t('translation:automations:header')} title={automationId.slice(-5)} /> */}
      <H1>{t("translation:automations:detail_header")}</H1>
      {/* <div className="mb-4 text-muted-foreground">{automationId.slice(-5)}</div> */}
      <LogsDataTable automationId={automationId} />
    </>
  );
}
