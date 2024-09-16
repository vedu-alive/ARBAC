import { Avatar, Table } from "antd"
import UserHeader from "./UserHeader"
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import DeleteIcon from "../../../assets/deleteIcon.svg"
import EditIcon from "../../../assets/editIcon.svg"
import './UsersTab.css'
import { accountType, userTableType } from "../../../types";

const dataSource: userTableType[] = [
  {
    key: "1",
    account: {
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      name: "Ravi Teja",
      email: "raviteja@gmail.com",
    },
    role: "employee",
    designation: "sr software developer",
    permissions: ["confluence", "figma", "Slack", "hubspot", "adobe", "github"],
    groups: ["developer-design"],
    created: new Date().toLocaleDateString(),
  },
];

const UsersTab = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const columns: ColumnType<userTableType>[] = [
      {
        title: <span className="table-header-label">Account</span>,
        dataIndex: "account",
        render: (account: accountType) => (
          <div className="account">
            <Avatar src={account.avatar} alt={account.name} />
            <div className="account-details">
              <span className="acc-name">{account.name}</span>
              <span className="acc-email">{account.email}</span>
            </div>
          </div>
        ),
      },
      {
        title: <span className="table-header-label">Role</span>,
        dataIndex: "role",
      },
      {
        title: <span className="table-header-label">Designation</span>,
        dataIndex: "designation",
      },
      {
        title: (
          <span className="table-header-label">Applications Permissions</span>
        ),
        dataIndex: "permissions",
      },
      {
        title: <span className="table-header-label">{"Group(s)"}</span>,
        dataIndex: "groups",
      },
      {
        title: <span className="table-header-label">Created on</span>,
        dataIndex: "created",
      },
      {
        title: <span className="table-header-label">Actions</span>,
        dataIndex: "actions",
        render: () => (
          <div className="actions">
            <span>
              <EditIcon />
              {"Edit"}
            </span>
            <span>
              <DeleteIcon />
              {"Delete"}
            </span>
          </div>
        ),
      },
    ];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
  return (
    <div>
      <UserHeader />
      <Table
        rootClassName="userTable"
        bordered={false}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
      />
    </div>
  );
}

export default UsersTab