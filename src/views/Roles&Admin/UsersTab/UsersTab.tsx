import { Avatar, Button, Dropdown, Flex, MenuProps, Skeleton, Space, Table, Tooltip } from "antd";
import UserHeader from "./UserHeader";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import DeleteIcon from "@/assets/deleteIcon.svg";
import EditIcon from "@/assets/editIcon.svg";
import "./UsersTab.css";
import { accountType, TableApplicationsType, userTableType } from "@/types";
import { Icons } from "@/mock";
import { AppPermissions, Apps } from "@/constants/enums";
import { useGetUsersQuery } from "@/redux/services/Administration";
import { getRandomColor } from "@/utils";
import { useNotificationContext } from "@/context/notificationContext";

const getTooltipData = (permissions: Apps[]) => {
  return permissions.map((permission) => (
    <Flex
      key={permission}
      align="center"
      justify="center"
      className="permission-icon-container"
    >
      {Icons[permission]}
    </Flex>
  ));
};

const getApplicationsIcons = (permissions: Apps[]) => {
  {
    if (permissions.length > 3) {
      return (
        <Flex align="center" gap={2}>
          {permissions.slice(0, 3).map((permission) => (
            <Flex
              key={permission}
              align="center"
              justify="center"
              className="permission-icon-container"
            >
              {Icons[permission]}
            </Flex>
          ))}
          <Flex
            align="center"
            justify="center"
            className="permission-icon-container"
            style={{ cursor: "pointer" }}
          >
            <Tooltip
              rootClassName="app-permission-tooltip"
              title={
                <Flex align="center" justify="center" gap={2}>
                  {getTooltipData(permissions.slice(3))}
                </Flex>
              }
            >
              <span style={{ color: "rgba(51, 77, 110, 1)" }}>
                +{permissions.length - 3}
              </span>
            </Tooltip>
          </Flex>
        </Flex>
      );
    }
    return (
      <Flex align="center" gap={2}>
        {permissions.map((permission) => (
          <Flex
            key={permission}
            align="center"
            justify="center"
            className="permission-icon-container"
          >
            {Icons[permission]}
          </Flex>
        ))}
      </Flex>
    );
  }
};

const getMenuItems = (permissions: Apps[]) => {
  return [
    ...permissions?.map((permission) => ({
      key: permission,
      label: (
        <Space align="center" direction="horizontal">
          {getApplicationsIcons([permission])} {permission}
        </Space>
      ),
      children: [
        {
          key: permission +"-"+ AppPermissions.view,
          label: "View",
        },
        {
          key: permission +"-"+ AppPermissions.edit,
          label: "Edit",
        },
        {
          key: permission +"-"+ AppPermissions.delete,
          label: "Delete",
        },
        {
          key: permission +"-"+ AppPermissions.approve,
          label: "Approve",
        },
        {
          key: permission +"-"+ AppPermissions.manage,
          label: "Manage",
        },
      ],
    })),
  ];
};

const getGroups = (groups: string[]) => {
  if (groups.length > 1) {
    return (
      <Flex align="center" gap={2}>
        {groups.slice(0, 1).map((groupName: string) => (
          <span className="table-group" key={groupName}>
            {groupName}
          </span>
        ))}
        <span className="table-group" style={{ cursor: "pointer" }}>
          <Tooltip
            rootClassName="app-permission-tooltip"
            title={
              <Flex align="center" justify="center" gap={4}>
                {groups.slice(1).map((groupName: string) => (
                  <span className="table-group-tooltip" key={groupName}>
                    {groupName}
                  </span>
                ))}
              </Flex>
            }
          >
            <span style={{ color: "rgba(51, 77, 110, 1)" }}>
              +{groups.length - 1}
            </span>
          </Tooltip>
        </span>
      </Flex>
    );
  }
  return (
    <Flex align="center" gap={2}>
      {groups.map((groupName: string) => (
        <span className="table-group" key={groupName}>
          {groupName}
        </span>
      ))}
    </Flex>
  );
};

const handleDropdownChange: MenuProps["onClick"] = (e) => {
  console.log(e,"onchange");
  
};

const UsersTab = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data: TableData, isLoading } = useGetUsersQuery('usersTab');
  const { contextHolder } = useNotificationContext();
  const columns: ColumnType<userTableType>[] = [
    {
      title: <span className="table-header-label">Account</span>,
      dataIndex: "account",
      render: (account: accountType) => (
        <div className="account">
          {account.avatar ? (
            <Avatar src={account.avatar} alt={account.name} />
          ) : (
            <Avatar
              style={{
                backgroundColor: getRandomColor(),
                verticalAlign: "middle",
              }}
              gap={4}
            >
              {account.name[0]}
            </Avatar>
          )}
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
      dataIndex: "applications",
      render: (applications: TableApplicationsType[]) => {
        const apps = applications.map((app) => Apps[app.application.name as keyof typeof Apps]);
        return (
          <Dropdown
            menu={{
              items: getMenuItems(apps),
              selectable: true,
              multiple: true,
              onClick: handleDropdownChange,
            }}
            rootClassName="app-permission-dropdown"
            arrow
          >
            <Space>{getApplicationsIcons(apps)}</Space>
          </Dropdown>
      )},
    },
    {
      title: <span className="table-header-label">{"Group(s)"}</span>,
      dataIndex: "groups",
      render: getGroups,
    },
    {
      title: <span className="table-header-label">Created on</span>,
      dataIndex: "createdOn",
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
      {contextHolder}
      <UserHeader />
      <Skeleton active loading={isLoading} style={{ padding: "1rem" }}>
        <Table
          rowKey={(record) => record.id}
          rootClassName="userTable"
          bordered={false}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={TableData}
        />
      </Skeleton>
    </div>
  );
};

export default UsersTab;
