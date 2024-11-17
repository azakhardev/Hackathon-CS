import {
  Calendar,
  ChartLine,
  ClipboardList,
  Container,
  Folder,
  Home,
  Inbox,
  MonitorCog,
  Search,
  Shapes,
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
    url: "#",
    icon: Folder, //MonitorCog, Container
  },
  {
    title: "Runners",
    url: "/runners",
    icon: TerminalSquare, //MonitorCog, Container
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: ClipboardList, //square-check
  },
  {
    title: "Metrics",
    url: "#",
    icon: ChartLine, //chart-line, chart-pie
  },
];
const itemsOps: Item[] = [
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
