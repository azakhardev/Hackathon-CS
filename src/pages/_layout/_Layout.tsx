import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/_layout/app-sidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function Layout() {
  //{ children }: { children: React.ReactNode }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className=" bg-bg_secondary">
        {/* <header className="mb-6 border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <Breadcrumbs />
        </header> */}
        <main className="h-full max-w-full px-4 mt-4 mb-3 sm:px-6 md:px-12 lg:px-24 xl:px-32 sm:mt-6 md:mt-8 lg:mt-10 sm:mb-4 md:mb-5 bg-bg_secondary">
          <div className="max-w-screen-lg mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
