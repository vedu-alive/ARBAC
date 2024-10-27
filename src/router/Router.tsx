import { BrowserRouter, Outlet, Route, Routes} from "react-router-dom"
import Layout from "@/components/Layout/Layout"
import Dashboard from "@/views/Dashboard/Dashboard"
import RolesAdmin from "@/views/Roles&Admin/Roles&Admin";
import NewUser from "@/views/NewUser/NewUser";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Settings from "@/views/Settings/Settings";
import { paths } from "@/constants/enums";

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.signup} element={<Signup />} />
        <Route path={paths.home} element={<Layout />}>
          <Route path={paths.dashboard} element={<Dashboard />} />
          <Route path={paths.roleAdministration} element={<Outlet />}>
            <Route index element={<RolesAdmin />} />
            <Route path={paths.newUser} element={<NewUser />} />
          </Route>
          <Route path={paths.appManagement} element={<div>App Management</div>} />
          <Route
            path={paths.policyManagement}
            element={<div>Policy Management</div>}
          />
          <Route
            path={paths.identityProviders}
            element={<div>Identity Providers</div>}
          />
          <Route
            path={paths.credentialsReports}
            element={<div>Credentials Reports</div>}
          />
          <Route
            path={paths.identityGovernance}
            element={<div>Identity Governance</div>}
          />
          <Route path={paths.settings} element={<Settings/>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router