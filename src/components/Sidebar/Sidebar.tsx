import './Sidebar.css';
import Logo from "@/assets/logo.svg";
import { Avatar } from 'antd';
import DashboardIcon from '@/assets/dashboardIcon.svg';
import RoleIcon from '@/assets/application&roleIcon.svg';
import PolicyIcon from '@/assets/policyICon.svg';
import IdentityIcon from '@/assets/identityIcon.svg';
import CredentialIcon from '@/assets/credentialIcon.svg';
import GovernanceIcon from '@/assets/governanceIcon.svg';
import RoleManagementIcon from '@/assets/roles&adminIcon.svg';
import SettingsIcon from '@/assets/settings.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  // set active class based on the current path
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    switch (path) {
      case "dashboard":
        setActive("dashboard");
        break;
      case "role-administration":
        setActive("role & administration");
        break;
      case "app-management":
        setActive("app management");
        break;
      case "policy-management":
        setActive("policy management");
        break;
      case "identity-providers":
        setActive("identity providers");
        break;
      case "credentials-reports":
        setActive("credentials reports");
        break;
      case "identity-governance":
        setActive("identityGovernance");
        break;
      case "settings":
        setActive("settings");
        break;
      default:
        setActive("dashboard");
    }
  },[])
  return (
    <div className="sidebar">
      <section className="productName">
        <Logo />{" "}
        <p>
          <span>Auth</span>Center
        </p>
      </section>

      <section className="administartor">
        <Avatar className="admin-avatar" />
        <div className="administartor-data">
          <span className="admin-name-typo">Admin</span>
          <span className="admin-mail-typo">admin@acme.com</span>
          <span className="admin-role-typo">Administrator</span>
        </div>
      </section>

      <section className="nav-options">
        <span
          onClick={() => { setActive("dashboard"); navigate("dashboard")}}
          className={`${
            active == "dashboard"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <DashboardIcon />
          {"dashboard"}
        </span>
        <span
          onClick={() => {setActive("role & administration"); navigate("/role-administration");}}
          className={`${
            active == "role & administration"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <RoleManagementIcon />
          {"role & administration"}
        </span>
        <span
          onClick={() => { setActive("app management");  navigate("/app-management");}}
          className={`${
            active == "app management"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <RoleIcon />
          {"app management"}
        </span>
        <span
          onClick={() => { setActive("policy management");  navigate("/policy-management");}}
          className={`${
            active == "policy management"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <PolicyIcon />
          {"policy management"}
        </span>
        <span
          onClick={() => { setActive("identity providers");  navigate("/identity-providers");}}
          className={`${
            active == "identity providers"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <IdentityIcon /> {"Identity providers"}
        </span>
        <span
          onClick={() => { setActive("credentials reports"); navigate("/credentials-reports");}}
          className={`${
            active == "credentials reports"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <CredentialIcon />
          {"credentials reports"}
        </span>
        <span
          onClick={() => {
            setActive("identityGovernance");
            navigate("/identity-governance");
          }}
          className={`${
            active == "identityGovernance"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <GovernanceIcon />
          {"identity governance"}
        </span>
      </section>

      <section className="sidebar-settings">
        <div
          onClick={() => { setActive("settings"); navigate("/settings");}}
          className={`${
            active == "settings"
              ? "dashboard-options active"
              : "dashboard-options"
          }`}
        >
          <SettingsIcon /> {"Settings"}
        </div>
      </section>
    </div>
  );
}

export default Sidebar