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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarHeaderBuilder title="Loop" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItems title="Dev" items={itemsDev} />
        <SidebarMenuItems title="Ops" items={itemsOps} />
      </SidebarContent>
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
const itemsDev: Item[] = [
  {
    title: "Projects",
    url: "/projects",
    icon: Folder, //MonitorCog, Container
  },
  {
    title: "Runners",
    url: "/runners",
    icon: Container, //TerminalSquare, MonitorCog, Container
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Check, //ClipboardList, SquareCheck
  },
];
const itemsOps: Item[] = [
  {
    title: "Metrics",
    url: "/metrics",
    icon: ChartPie, //ChartLine, chart-pie
  },
  {
    title: "Automations",
    url: "/automations",
    icon: Workflow,
  },
  {
    title: "Types",
    url: "/automationTypes",
    icon: Shapes, //Shapes, Triangle
  },
];

const SidebarMenuItems = ({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) => (
  <SidebarGroup>
    <SidebarGroupLabel>{title}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
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
