import H1 from "@/components/ui/typography/H1";
import AutomationsDataTable from "./AutomationsDataTable";
import { useUserValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function AutomationsPage() {
  useUserValidate();
  const { t } = useTranslation();
  return (
    <>
      <H1>{t("translation:automations:header")}</H1>
      <AutomationsDataTable limit={undefined} isNav={true} />
    </>
  );
}
