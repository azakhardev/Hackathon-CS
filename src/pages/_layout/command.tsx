"use client";

import * as React from "react";
import {
  CheckIcon,
  ContainerIcon,
  FolderIcon,
  PieChartIcon,
  SearchIcon,
  ShapesIcon,
  WorkflowIcon,
  LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { Link, useNavigate } from "react-router-dom";
import { useCommandStore } from "@/lib/store";

interface NavItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

const navigationItems: NavItem[] = [
  { title: "Projects", icon: FolderIcon, path: "/projects" },
  { title: "Runners", icon: ContainerIcon, path: "/runners" },
  { title: "Jobs", icon: CheckIcon, path: "/jobs" },
  { title: "Metrics", icon: PieChartIcon, path: "/metrics" },
  { title: "Automations", icon: WorkflowIcon, path: "/automations" },
  { title: "Automations Type", icon: ShapesIcon, path: "/automationTypes" },
];

interface MyCommandProps {
  title: string;
  icon: LucideIcon;
  onNavigate: () => void;
}

const MyCommand: React.FC<MyCommandProps> = ({
  title,
  icon: Icon,
  onNavigate,
}) => (
  <CommandItem onSelect={onNavigate}>
    <Icon />
    <span>{title}</span>
  </CommandItem>
);

export function CommandDialogDemo() {
  //const [open, setOpen] = React.useState(false);
  const open = useCommandStore((state) => state.isOpen);
  const setOpen = useCommandStore((state) => state.toggleShow);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const sasQuery = useQuery({
    queryKey: ["sas"], //searchText - api cant filter, always same all response (cache with single key)
    queryFn: async () => await RunnerModel.getSAS(""),
  });
  const navigate = useNavigate();

  return (
    <>
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuItem className="flex justify-center">
              <SearchIcon size={15} />
            </SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent>
            <kbd className="p-4 pointer-events-none inline-flex h-5 select-none mb-2 items-center gap-1 rounded border bg-bg_default px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Favorite">
            <MyCommand
              title="GIORGIO"
              icon={FolderIcon}
              onNavigate={() => {
                navigate("/projects/SAS_GIORGIO");
                setOpen();
              }}
            />
          </CommandGroup>
          <CommandGroup heading="Pages">
            {navigationItems.map((item) => (
              <MyCommand
                key={item.path}
                title={item.title}
                icon={item.icon}
                onNavigate={() => {
                  navigate(item.path);
                  setOpen();
                }}
              />
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {sasQuery.data &&
              (sasQuery.data as string[]).map((s) => (
                <MyCommand
                  key={s}
                  title={s.slice(4)}
                  icon={FolderIcon}
                  onNavigate={() => {
                    navigate(`/projects/${s}`);
                    setOpen();
                  }}
                />
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
