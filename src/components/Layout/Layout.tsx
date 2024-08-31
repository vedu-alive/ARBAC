import { Outlet } from "react-router-dom"
import HeaderComponent from "../HeaderComponent/HeaderComponent"
import Sidebar from "../Sidebar/Sidebar"
import './Layout.css'
import BreadCrumb from "../Breadcrumb/BreadCrumb"

const Layout = () => {
  return (
    <div className="layout">
      <section className="layout-sidebar">
        <Sidebar />
      </section>
      <section className="layout-mainBody">
        <HeaderComponent />
        <section className="layout-displayarea">
          <BreadCrumb />
          <Outlet />
        </section>
      </section>
    </div>
  );
}

export default Layout