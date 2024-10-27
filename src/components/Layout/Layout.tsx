import { Outlet, useNavigate } from "react-router-dom"
import HeaderComponent from "../HeaderComponent/HeaderComponent"
import Sidebar from "../Sidebar/Sidebar"
import './Layout.css'
import BreadCrumb from "../Breadcrumb/BreadCrumb"
import { useEffect } from "react"
import { checkToken } from "@/utils"

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(window.location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [])
  useEffect(() => {
    !checkToken() && navigate("/login", { replace: true });
  },[checkToken])
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