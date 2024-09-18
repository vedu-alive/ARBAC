import { Flex, Table } from 'antd';
import { ReactNode, useMemo } from 'react';
import { ColumnType } from 'antd/es/table';
import './SelectedAppTable.css';
import { Icons } from '../../mock';
import { SelectedAppTableData } from '../../types';
import { AppPermissions } from '../../constants/enums';

type Props = {
  setSelectedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
  selectedRowKeys: React.Key[];
  selectedApps: string[];
  selectedPermissions: AppPermissions[];
  setSelectedRowData: (value: React.SetStateAction<SelectedAppTableData | null>) => void;
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

const SelectedAppsTable = ({ selectedRowKeys, setSelectedRowKeys, selectedApps, selectedPermissions,setSelectedRowData }: Props) => {

  const tableData: SelectedAppTableData[] = useMemo(() => {
    return selectedApps.map((item) => {
      return {
        key: item,
        application: {
          icon: Icons[item as keyof typeof Icons],
          name: item,
        },
        //* need to change these 2 values
        attachedPolicy: "Default",
        permissions: selectedPermissions.map((permission) => permissionsArray[permission]) as AppPermissions[],
      };
    });
  }, [selectedApps, selectedPermissions]);
  
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
            <Flex align='center' gap={'4px'} wrap='wrap' >
              {val.map((item, i) => (
                <Tag key={i} text={item} />
              ))}
            </Flex>
          );
        },
      },
    ];

    const onSelectChange = (
      newSelectedRowKeys: React.Key[],
    ) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
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
}

export default SelectedAppsTable