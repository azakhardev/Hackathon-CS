import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import H1 from "@/components/ui/typography/H1";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function AutomationTypesPage() {
  userValidate();
  const { t } = useTranslation();
  return (
    <>
      <H1>{t("translation:automationTypes:header")}</H1>
      <AutomationTypesDataTable isNav={true} limit={9999} />
    </>
  );
}
