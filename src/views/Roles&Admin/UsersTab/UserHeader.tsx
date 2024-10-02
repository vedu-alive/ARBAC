import { Button, Input } from "antd"
import SearchIcon from '@/assets/dashboardSearchIcon.svg'
import FilterIcon from '@/assets/filterIcon.svg'
import AddIcon from "@/assets/addIcon.svg";
import './UsersTab.css';
import { useNavigate } from "react-router-dom";
const UserHeader = () => {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="userHeader">
        <Input
          placeholder="Search with user names, user roles, email addresses, etc..."
          prefix={<SearchIcon />}
          className="userHeader-searchbar"
        />
        <Button className="filter-btn">
          <FilterIcon />
          {"Add Filter"}
        </Button>
      </div>
      <Button
        type="primary"
        className="tab-extra-btn"
        onClick={() => nav("/role-administration/new-user")}
      >
        <span
          style={{
            display: "flex",
            height: "1.125rem",
            width: "1.125rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddIcon />
        </span>
        {"Add User"}
      </Button>
    </div>
  );
}

export default UserHeader