import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/layout/app-sidebar";

export default function Layout() {
  //{ children }: { children: React.ReactNode }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {/* {children} */}
        <Outlet></Outlet>
      </main>
    </SidebarProvider>
  );
}

// import Header from "./Header";
// import Footer from "./Footer";
// import Menu from "./Menu";
// import Content from "./Content";

// export default function Layout() {
//   return (
//     <div className="flex flex-col w-screen h-screen">
//       <Header />
//       <Content>
//         <Menu />
//         <Outlet></Outlet>
//       </Content>
//       <Footer />
//     </div>
//   );
// }
