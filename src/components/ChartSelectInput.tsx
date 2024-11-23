import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
}

export default function ChartSelectInput(props: IProps) {
  return (
    <Select
      onValueChange={(e) => {
        props.onValueChange(e);
      }}
      defaultValue={props.defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=" ">All</SelectItem>
        <SelectItem value="csas-dev">Dev</SelectItem>
        <SelectItem value="csas-ops">Ops</SelectItem>
      </SelectContent>
    </Select>
  );
}
