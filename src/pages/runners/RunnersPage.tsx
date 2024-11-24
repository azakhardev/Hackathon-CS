import H1 from "@/components/ui/typography/H1";
import RunnersDataTable from "../../components/features/runners/RunnersDataTable";
import { userValidate } from "@/lib/utils/validateUser";
import { useTranslation } from "react-i18next";

export default function RunnersPage() {
  userValidate();
  const { t } = useTranslation();
  return (
    <div>
      <H1>{t("translation:runners:header")}</H1>
      <RunnersDataTable isNav={true} limit2={25} />
    </div>
  );
}
