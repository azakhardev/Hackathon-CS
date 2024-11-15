import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Content from "./Content";

export default function MainLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Content>
        <Menu />
        <Outlet></Outlet>
      </Content>
      <Footer />
    </div>
  );
}
