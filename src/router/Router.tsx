import { BrowserRouter, Outlet, Route, Routes,} from "react-router-dom"
import Layout from "../components/Layout/Layout"
import Dashboard from "../views/Dashboard/Dashboard"
import RolesAdmin from "../views/Roles&Admin/Roles&Admin";
import NewUser from "../views/NewUser/NewUser";

const Router= () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route
            path="/role-administration"
            element={<Outlet/>}
          >
            <Route index element={<RolesAdmin />} />
            <Route path="new-user" element={<NewUser/>} />
          </Route>
          <Route path="app-management" element={<div>App Management</div>} />
          <Route
            path="policy-management"
            element={<div>Policy Management</div>}
          />
          <Route
            path="identity-providers"
            element={<div>Identity Providers</div>}
          />
          <Route
            path="credentials-reports"
            element={<div>Credentials Reports</div>}
          />
          <Route
            path="identity-governance"
            element={<div>Identity Governance</div>}
          />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router