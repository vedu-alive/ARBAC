import { Table } from 'antd';
import SlackIcon from "../../assets/slackLogo.svg";
import FigmaIcon from "../../assets/figmaLogo.svg";
import ConfluenceIcon from "../../assets/conflenceLogo.svg";
import MSOfficeIcon from "../../assets/MSOfficeLogo.svg";
import { ReactNode } from 'react';
import { ColumnType } from 'antd/es/table';
import './SelectedAppTable.css';

type Props = {
    setSelectedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
    selectedRowKeys: React.Key[];
};

const SelectedAppsTable = ({selectedRowKeys,setSelectedRowKeys}: Props) => {
    const columns: ColumnType<any>[] = [
      {
        title: "Application",
        dataIndex: "application",
        key: "appName",
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
      },
      {
        title: "Permissions",
        dataIndex: "permissions",
        key: "permissions",
        render: (val: string[]) => {
          return val.map((item,i) => <span key={i}>{item + ", "}</span>);
        },
      },
    ];

    const dataSource = [
      {
        key: "1",
        application: { name: "Slack", icon: <SlackIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: "2",
        application: { name: "Figma", icon: <FigmaIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: "3",
        application: { name: "Confluence", icon: <ConfluenceIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: "4",
        application: { name: "Microsoft Office 365", icon: <MSOfficeIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
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
    <Table
      rootClassName='selected-app-table'
      rowSelection={rowSelection}
      rowKey={(record) => record.key}
      columns={columns}
      scroll={{ y: 150 }}
      dataSource={dataSource}
      pagination={false}
    />
  );
}

export default SelectedAppsTable