import {
  Calendar,
  ChartLine,
  ChartPie,
  Check,
  ClipboardList,
  Container,
  Folder,
  Home,
  Inbox,
  MonitorCog,
  Search,
  Shapes,
  SquareCheck,
  TerminalSquare,
  Triangle,
  Workflow,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarMenuItems title="Dev" items={itemsDev} />
        <SidebarMenuItems title="Ops" items={itemsOps} />
      </SidebarContent>
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
    url: "/automations",
    icon: Shapes, //Triangle
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
