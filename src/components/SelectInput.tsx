import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface ISelectItem {
  value: string;
  content: React.ReactNode;
}

export default function SelectInput({
  placeholder,
  items,
  onValueChange,
}: {
  placeholder: string;
  items: ISelectItem[];
  onValueChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=" ">{placeholder}</SelectItem>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.content}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
