import { Button, Checkbox, Input, Radio } from "antd";
import { SetStateAction, useState } from "react";
import CrossIcon from "../../assets/crossIcon.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import SlackIcon from "../../assets/slackLogo.svg";
import FigmaIcon from "../../assets/figmaLogo.svg";
import ConfluenceIcon from "../../assets/conflenceLogo.svg";
import MSOfficeIcon from "../../assets/MSOfficeLogo.svg";
import OpenInNewIcon from "../../assets/OpenInNewIcon.svg";
import InfoIcon from "../../assets/infoIcon.svg";
import './NewUser.css'
import SelectedAppsTable from "./SelectedAppsTable";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (x: SetStateAction<boolean>) => void;
};

const apps = [
  {
    id: "app1",
    name: "Slack",
    icon: <SlackIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Active",
  },
  {
    id: "app2",
    name: "Figma",
    icon: <FigmaIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Active",
  },
  {
    id: "app3",
    name: "Confluence",
    icon: <ConfluenceIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Inactive",
  },
  {
    id: "app4",
    name: "Microsoft Office 365",
    icon: <MSOfficeIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Inactive",
  },
];

const manuelPermissions = [
  {
    id: "view",
    name: "View-Only",
  },
  {
    id: "edit",
    name: "Edit",
  },
  {
    id: "approve",
    name: "Approve",
  },
  {
    id: "manage",
    name: "Manage",
  },
  {
    id: "delete",
    name: "Delete",
  },
];

const Btns = () => {
  return (
    <Radio.Group rootClassName="" defaultValue="all" buttonStyle="solid">
      <Radio.Button value="all" >All</Radio.Button>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="inactive">Inactive</Radio.Button>
    </Radio.Group>
  );
};

const AppModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<number>(1);
  const [permission, setPermission] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleAppCardClick = (id: string) => {
    if (selectedApps.includes(id)) {
      setSelectedApps(selectedApps.filter((app) => app !== id));
      return;
    }
    setSelectedApps((prev) => [...prev, id]);
  };

  const handlePermission = (id: string) => {
    if (permission.includes(id)) {
      setPermission(permission.filter((perm) => perm !== id));
      return;
    }
    setPermission((prev) => [...prev, id]);
  };

  return (
    <div className="app-modal">
      <section className="modal-header" onClick={() => console.log("Clicked")}>
        <p>{"Application Catalogue"}</p>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(false)}
        >
          <CrossIcon />
        </div>
      </section>
      <section className="app-modal-body">
        {/* //* Left */}
        <section>
          <div className="modal-search-input-container">
            <Input
              className="modal-search-input"
              prefix={<SearchIcon />}
              placeholder="Search with application name (e.g. Slack)"
            />
          </div>
          <div className="select-apps">
            <div className="select-apps-header">
              {"Select Applications"} <Btns />
            </div>
            <div className="app-card-container">
              {apps.map((app) => (
                <div
                  className="app-card"
                  key={app.id}
                  onClick={() => handleAppCardClick(app.id)}
                >
                  <Checkbox checked={selectedApps.includes(app.id)} />
                  <span className="app-card-icon">{app.icon}</span>
                  <div className="app-card-details-container">
                    <p className="app-card-status">
                      {"Application Name"}{" "}
                      <span className={`${app.status}`}>{app.status}</span>
                    </p>
                    <p className="app-card-app-name">{app.name}</p>
                    <p className="app-card-description">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="selected-apps-section">
            {"Selected Application "}
            <span className="selected-app-count">
              {"Total " + selectedApps.length}{" "}
            </span>
          </div>
          <SelectedAppsTable
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        </section>

        {/* //* Right */}
        <section className="app-modal-right">
          <p className="app-modal-right-heading">
            {"Select Application Permission"}
          </p>
          <Radio.Group defaultValue={1}>
            <Radio
              value={1}
              onChange={(e) => {console.log(typeof e.target.value);
              setSelectedPermission(e.target.value)}}
            >
              {"Select Permission Manually"}
            </Radio>
            <Radio
              value={2}
              onChange={(e) => setSelectedPermission(e.target.value)}
            >
              {"Attach Policy certificate"}
            </Radio>
          </Radio.Group>
          {selectedPermission === 1 && (
            <div>
              {manuelPermissions.map((item) => (
                <div
                  key={item.id}
                  className="permission-card"
                  onClick={() => handlePermission(item.id)}
                >
                  <Checkbox checked={permission.includes(item.id)} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      {/*//* footer section */}
      <section className="app-modal-footer">
        <p className="info-txt-typo">
          <InfoIcon />
          {"You can assign app permissions later in the"}
          <span>
            {" Application Management"} <OpenInNewIcon />
          </span>
          {"tab"}
        </p>
        <Button type="link">Save Changes</Button>
      </section>
    </div>
  );
};
export default AppModal;