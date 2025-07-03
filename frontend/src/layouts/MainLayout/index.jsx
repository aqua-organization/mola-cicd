import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BodyContent from "./components/BodyContent";
import HeaderContent from "./components/HeaderContent";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout-container">
        <Sidebar />
        <div className="main-layout-content">
          <HeaderContent />
          <BodyContent>
            <Outlet />
          </BodyContent>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
