import {
  ArrowDownAZIcon,
  ArrowDownUpIcon,
  ArrowDownZAIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SelectInput, { ISelectItem } from "./SelectInput";

export function ButtonSort() {
  const directions: ISelectItem[] = [
    { value: "asc", content: <ArrowDownAZIcon /> },
    { value: "desc", content: <ArrowDownZAIcon /> },
  ];
  const cols: ISelectItem[] = [
    { value: "id", content: "Id" },
    { value: "state", content: "State" },
    { value: "runner_group", content: "Group" },
    { value: "organization", content: "Organization" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownUpIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-col gap-2 p-1">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <SelectInput
                placeholder=""
                items={cols}
                onValueChange={(e) => console.log(e)}
              />
            </div>
            <div className="flex flex-col gap-2 p-1">
              <span className="text-sm text-muted-foreground">
                In Direction
              </span>
              <SelectInput
                placeholder=""
                items={directions}
                onValueChange={(e) => console.log(e)}
              />
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
