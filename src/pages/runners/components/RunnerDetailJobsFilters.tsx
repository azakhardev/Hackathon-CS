import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

import { DatePickerWithRange } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";

export default function RunnerDetailJobsFilter() {
  return (
    <div className="grid grid-cols-5 gap-10 my-5">
      <Input className="text-white border-gray-100 " placeholder="Find ..." />
      <DatePickerWithRange className="" />
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All runners" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All runners" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All runners" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
