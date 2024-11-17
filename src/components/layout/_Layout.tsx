import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Content from "./Content";

export default function Layout() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <Content>
        <Menu />
        <Outlet></Outlet>
      </Content>
      <Footer />
    </div>
  );
}
