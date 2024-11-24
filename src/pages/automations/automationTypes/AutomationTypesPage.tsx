import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import H1 from "@/components/ui/typography/H1";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function AutomationTypesPage() {
  useUserValidate();
  const { t } = useTranslation();
  return (
    <>
      <H1>{t("translation:automationTypes:header")}</H1>
      <AutomationTypesDataTable limit={9999} />
    </>
  );
}
