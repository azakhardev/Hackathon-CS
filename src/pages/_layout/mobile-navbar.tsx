import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useCommandStore } from "@/lib/store";
import { HomeIcon, PanelRightIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Item = {
  title: string;
  action: () => void;
  icon: React.ComponentType;
};

export default function MobileNavbar() {
  const navigate = useNavigate();
  const setOpen = useCommandStore((state) => state.toggleShow);
  const { toggleSidebar } = useSidebar();

  const items: Item[] = [
    {
      title: "Sidebar",
      action: () => toggleSidebar(),
      icon: PanelRightIcon,
    },
    {
      title: "Home",
      action: () => navigate("/"),
      icon: HomeIcon,
    },
    {
      title: "Search",
      action: () => setOpen(),
      icon: SearchIcon,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full h-16 bg-bg_secondary">
      <div className="flex flex-row w-full h-full">
        {items.map((item) => (
          <SidebarMenuButton
            key={item.title}
            onClick={item.action}
            className="flex justify-center w-full h-full"
          >
            <Link to="#">
              <item.icon />
            </Link>
          </SidebarMenuButton>
        ))}
      </div>
    </nav>
  );
}
