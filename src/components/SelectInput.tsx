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
  defaultValue,
  onValueChange,
  param,
}: {
  defaultValue: string;
  placeholder?: string;
  items: ISelectItem[];
  onValueChange: (value: string) => void;
  param: string;
}) {
  const handleValueChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, "", url);

    onValueChange(value);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-auto sm:w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.content}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
