import {
  ChartPie,
  Check,
  Container,
  Folder,
  InfinityIcon,
  Shapes,
  Workflow,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarHeaderBuilder title="Loop" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItems title="Dev" items={itemsDev(t)} />
        <SidebarMenuItems title="Ops" items={itemsOps(t)} />
      </SidebarContent>
      <SidebarFooter>
        {/* <CommandDialogDemo /> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="w-full" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="">
                {/* Open sidebar */}
                <kbd className=" p-4 pointer-events-none inline-flex h-5 select-none mb-2 items-center gap-1 rounded border bg-bg_default px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
                  {/* bg-muted */}
                  <span className="text-xs">⌘</span>B
                </kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// Menu items.
type Item = {
  title: string;
  url: string;
  icon: React.ComponentType;
};
const itemsDev = (t: any): Item[] => [
  {
    title: t("translation:homepage:projects_header"),
    url: "/projects",
    icon: Folder, //MonitorCog, Container
  },
  {
    title: t("translation:homepage:runners_header"),
    url: "/runners",
    icon: Container, //TerminalSquare, MonitorCog, Container
  },
  {
    title: t("translation:homepage:jobs_header"),
    url: "/jobs",
    icon: Check, //ClipboardList, SquareCheck
  },
];
const itemsOps = (t: any): Item[] => [
  {
    title: t("translation:metrics:header"),
    url: "/metrics",
    icon: ChartPie, //ChartLine, chart-pie
  },
  {
    title: t("translation:homepage:automations_header"),
    url: "/automations",
    icon: Workflow,
  },
  {
    title: t("translation:homepage:types_header"),
    url: "/automationTypes",
    icon: Shapes, //Shapes, Triangle
  },
];

function SidebarMenuItems({ title, items }: { title: string; items: Item[] }) {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                onClick={() => {}}
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const SidebarHeaderBuilder = ({ title }: { title: string }) => (
  <SidebarMenu>
    <SidebarMenuItem>
      <Link to="/">
        <SidebarMenuButton
          size="lg"
          //className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center justify-center rounded-lg aspect-square size-8 ">
            {/* bg-sidebar-primary text-sidebar-primary-foreground */}
            <InfinityIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-sm leading-tight text-left">
            <span className="font-semibold truncate">{title}</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  </SidebarMenu>
);
