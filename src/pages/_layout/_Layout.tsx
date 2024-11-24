import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/_layout/app-sidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import MobileNavbar from "./mobile-navbar";
import { CommandButton, CommandDialogDemo } from "./command";
import { LanguageSwitch } from "@/components/languageSelector";

export default function Layout() {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className=" bg-bg_secondary">
        <CommandDialogDemo />

        <header className="mb-6 border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between px-4">
          <Breadcrumbs />
          {!isMobile && (
            <div>
              <CommandButton />
              <LanguageSwitch />
            </div>
          )}
        </header>
        <main className="h-full max-w-full px-4 mb-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 sm:mb-4 md:mb-5 bg-bg_secondary">
          <div className="max-w-screen-lg mx-auto">
            <Outlet />
          </div>
        </main>
        {isMobile && <MobileNavbar />}
      </SidebarInset>
    </SidebarProvider>
  );
}
