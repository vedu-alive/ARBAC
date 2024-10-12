import { Flex, Table } from "antd";
import { ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import { ColumnType } from "antd/es/table";
import "./SelectedAppTable.css";
import { SelectedAppTableData } from "@/types";
import { AppPermissions } from "@/constants/enums";
import { TableRowSelection } from "antd/es/table/interface";

type Props = {
  setSelectedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
  selectedRowKeys: React.Key[];
  selectedApps: string[];
  selectedPermissions: AppPermissions[];
  setSelectedRowData: (
    value: React.SetStateAction<SelectedAppTableData[]>
  ) => void;
  selectedRowData: SelectedAppTableData[];
  setPermission: (x: SetStateAction<AppPermissions[]>) => void;
  selectedAppTableData: SelectedAppTableData[];
};

const permissionsArray = {
  [AppPermissions.approve]: "Approve",
  [AppPermissions.delete]: "Delete",
  [AppPermissions.edit]: "Edit",
  [AppPermissions.manage]: "Manage",
  [AppPermissions.view]: "View-Only",
};

const Tag = ({ text }: { text: string }) => {
  return <span className={text}>{text}</span>;
};

const SelectedAppsTable = ({
  selectedRowKeys,
  setSelectedRowKeys,
  selectedPermissions,
  setSelectedRowData,
  selectedRowData,
  setPermission,
  selectedAppTableData,
}: Props) => {
  const [tableData, setTableData] = useState<SelectedAppTableData[]>([]);
  //*setting up the table data
  useEffect(() => {
    setTableData(selectedAppTableData);
  }, [selectedAppTableData]);

  //* responisble for updating the permissions in the table
  useEffect(() => {
    const index = tableData.findIndex(
      (item) => item.key === selectedRowData[0]?.key
    );
    if (index !== -1) {
      const data = [...tableData];
      data[index].permissions = selectedPermissions.map(
        (permission) => permission
      ) as AppPermissions[];
      setTableData(data);
    }
  }, [selectedPermissions, selectedRowData]);

  const columns: ColumnType<SelectedAppTableData>[] = [
    {
      title: "Application",
      dataIndex: "application",
      key: "appName",
      width: "auto",
      render: (value: { icon: ReactNode; name: string }) => {
        return (
          <div className="table-app-name">
            <span
              className={`table-app-icon ${
                value.name === "Microsoft Office 365" && "ms-office-icon"
              }`}
            >
              {value.icon}
            </span>
            <span
              className={`"app-name" ${
                value.name === "Microsoft Office 365" && "ms-office-name"
              }`}
            >
              {value.name}
            </span>
          </div>
        );
      },
    },
    {
      title: "Attached Policy",
      dataIndex: "attachedPolicy",
      key: "attachedPolicy",
      ellipsis: true,
      width: "auto",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: "45%",
      render: (val: string[]) => {
        return (
          <Flex align="center" gap={"4px"} wrap="wrap">
            {val.map((item, i) => (
              <Tag
                key={i}
                text={permissionsArray[item as keyof typeof permissionsArray]}
              />
            ))}
          </Flex>
        );
      },
    },
  ];

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: SelectedAppTableData[]
  ) => {
    setPermission([...selectedRows[0]?.permissions]);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowData(selectedRows);
  };

  const rowSelection: TableRowSelection<SelectedAppTableData> = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rootClassName="selected-app-table"
      rowSelection={rowSelection}
      rowKey={(record) => record.key}
      columns={columns}
      scroll={{ y: 150 }}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default SelectedAppsTable;
