"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CheckIcon,
  ContainerIcon,
  CreditCard,
  FolderIcon,
  PieChartIcon,
  SearchIcon,
  Settings,
  ShapesIcon,
  Smile,
  User,
  WorkflowIcon,
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

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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
      <TooltipProvider>
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
      </TooltipProvider>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Favorite">
            {/*ADD favorite func*/}
            <CommandItem
              onSelect={() => {
                navigate("/projects/SAS_GIORGIO");
                setOpen(false);
              }}
            >
              <FolderIcon />
              <span>GIORGIO</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => {
                navigate("/projects");
                setOpen(false);
              }}
            >
              <FolderIcon />
              <span>Projects</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/runners");
                setOpen(false);
              }}
            >
              <ContainerIcon />
              <span>Runners</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/jobs");
                setOpen(false);
              }}
            >
              <CheckIcon />
              <span>Jobs</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/metrics");
                setOpen(false);
              }}
            >
              <PieChartIcon />
              <span>Metrics</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/automations");
                setOpen(false);
              }}
            >
              <WorkflowIcon />
              <span>Automations</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/automationTypes");
                setOpen(false);
              }}
            >
              <ShapesIcon />
              <span>Automations Type</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {sasQuery.data &&
              (sasQuery.data as string[]).map((s) => (
                <CommandItem
                  key={s}
                  onSelect={() => {
                    navigate(`/projects/${s}`);
                    setOpen(false);
                  }}
                >
                  <FolderIcon />
                  <span>{s.slice(4)}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
