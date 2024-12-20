import { Button, Checkbox, Input, Radio, } from "antd";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import CrossIcon from "@/assets/crossIcon.svg";
import SearchIcon from "@/assets/searchIcon.svg";
import OpenInNewIcon from "@/assets/OpenInNewIcon.svg";
import InfoIcon from "@/assets/infoIcon.svg";
import './NewUser.css'
import SelectedAppsTable from "./SelectedAppsTable";
import { appsList, Icons, manuelPermissions } from "@/mock";
import { convertTableData, debounce } from "@/utils";
import { AppDispatch, SelectedAppTableData } from "@/types";
import { AppPermissions, AppStatus } from "@/constants/enums";
import Btns from "./utils/Btns";
import { useDispatch, useSelector } from "react-redux";
import { setSavedApplications, usersData,} from "@/redux/slices/Administration/users";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (x: SetStateAction<boolean>) => void;
};

const AppModal = ({ setIsModalOpen }: Props) => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<number>(1);
  const [permission, setPermission] = useState<AppPermissions[]>([AppPermissions.view]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.all);
  const [filteredApps, setFilteredApps] = useState(appsList);
  const [selectedRowData, setSelectedRowData] = useState<SelectedAppTableData[]>([]);
  const [selectedAppTableData, setSelectedAppTableData] = useState<SelectedAppTableData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (selectedRowData.length) {
      setPermission(selectedRowData[0].permissions);
    }
  }, [selectedRowData]);

  useEffect(() => {
    if (!selectedApps.length) {
      setSelectedRowKeys([]);
      setSelectedRowData([]);
    }
  }, [selectedApps]);

  const generateTableData = (id: string) => {
    const index = selectedAppTableData.findIndex((item) => item.key === id);
    if (index !== -1) {
      setSelectedAppTableData((prev) => prev.filter((item) => item.key !== id));
    }
    else {
      const data = {
        key: id,
        application: {
          icon: Icons[id as keyof typeof Icons],
          name: id,
        },
        attachedPolicy: "Default",
        //* need to decide whether to keep the default permission or not
        permissions: [AppPermissions.view],
        // permissions: permission,
      };
      setSelectedAppTableData(prev=>[...prev,data]);
    }
  }

  const handleAppCardClick = (id: string) => {
    generateTableData(id);
    if (selectedApps.includes(id)) {
      setSelectedApps(selectedApps.filter((app) => app !== id));
      return;
    }
    setSelectedApps((prev) => [...prev, id]);
  };
  
  const handleSaveChanges = () => {
    dispatch(setSavedApplications(selectedAppTableData));
    setIsModalOpen(false);
  }

  const handlePermissionClick = (id: AppPermissions) => {
    if (permission.includes(id)) {
      setPermission(permission.filter((perm) => perm !== id));
      return;
    }
    setPermission((prev) => [...prev, id]);
  };

  const handleAppSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      switch (appStatus) {
        case AppStatus.all:
          setFilteredApps(appsList);
          break;
        case AppStatus.active:
          setFilteredApps(appsList.filter((app) => app.status === AppStatus.active));
          break;
        case AppStatus.inactive:
          setFilteredApps(appsList.filter((app) => app.status === AppStatus.inactive));
          break;
        default:
          break;
      }
      return;
    }
    const filteredData = filteredApps.filter((app) =>
      app.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredApps(filteredData);
  }, 500);

  return (
    <div className="app-modal">
      <section className="modal-header">
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
              onChange={handleAppSearch}
            />
          </div>
          <div className="select-apps">
            <div className="select-apps-header">
              {"Select Applications"}{" "}
              <Btns
                appStatus={appStatus}
                setAppStatus={setAppStatus}
                fliteredApps={filteredApps}
                setFilteredApps={setFilteredApps}
              />
            </div>
            <div className="app-card-container">
              {filteredApps.map((app) => (
                <div
                  className="app-card"
                  key={app.id}
                  onClick={() => handleAppCardClick(app.id.toString())}
                >
                  <Checkbox
                    checked={selectedApps.includes(app.id.toString())}
                  />
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
            setSelectedRowData={setSelectedRowData}
            selectedAppTableData={selectedAppTableData}
            selectedRowData={selectedRowData}
            selectedApps={selectedApps}
            setPermission={setPermission}
            selectedPermissions={permission}
          />
        </section>

        {/* //* Right */}
        <section className="app-modal-right">
          <p className="app-modal-right-heading">
            {"Select Application Permission"}
          </p>
          <Radio.Group
            defaultValue={1}
            disabled={selectedApps.length === 0 || selectedRowData.length === 0}
          >
            <Radio
              value={1}
              onChange={(e) => {
                setSelectedPermission(e.target.value);
              }}
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
                  className={
                    selectedRowData.length || selectedRowData.length
                      ? "permission-card"
                      : "permission-card-disabled"
                  }
                  onClick={() => handlePermissionClick(item.id)}
                >
                  <Checkbox
                    checked={permission.includes(item.id)}
                    disabled={
                      selectedApps.length === 0 || selectedRowData.length === 0
                    }
                  />
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
        <Button onClick={handleSaveChanges} type="primary">
          Save Changes
        </Button>
      </section>
    </div>
  );
};
export default AppModal;