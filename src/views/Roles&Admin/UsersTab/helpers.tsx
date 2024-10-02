import { AppPermissions, Apps } from "@/constants/enums";
import { Icons } from "@/mock";
import { Flex, Space, Tooltip } from "antd";

export const getTooltipData = (permissions: Apps[]) => {
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

export const getApplicationsIcons = (permissions: Apps[]) => {
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

export const getMenuItems = (permissions: Apps[]) => {
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
          key: permission + AppPermissions.view,
          label: "View",
        },
        {
          key: permission + AppPermissions.edit,
          label: "Edit",
        },
        {
          key: permission + AppPermissions.delete,
          label: "Delete",
        },
        {
          key: permission + AppPermissions.approve,
          label: "Approve",
        },
        {
          key: permission + AppPermissions.manage,
          label: "Manage",
        },
      ],
    })),
  ];
};

export const getGroups = (groups: string[]) => {
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
