import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface IProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
}

export default function ChartSelectInput(props: IProps) {
  const { t } = useTranslation()
  return (
    <Select
      onValueChange={(e) => {
        props.onValueChange(e);
      }}
      defaultValue={props.defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder={t('translation:filters:projects_placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=" ">{t('translation:filters:projects_placeholder')}</SelectItem>
        <SelectItem value="csas-dev">Dev</SelectItem>
        <SelectItem value="csas-ops">Ops</SelectItem>
      </SelectContent>
    </Select>
  );
}
