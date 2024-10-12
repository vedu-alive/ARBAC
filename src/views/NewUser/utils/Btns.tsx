import { AppStatus } from "@/constants/enums";
import { appsList } from "@/mock";
import { appsListType } from "@/types";
import { Radio, RadioChangeEvent } from "antd";
import { Dispatch, SetStateAction } from "react";

type BtnsProps = {
  fliteredApps: appsListType[];
  setFilteredApps: Dispatch<SetStateAction<appsListType[]>>;
  appStatus: AppStatus;
  setAppStatus: Dispatch<SetStateAction<AppStatus>>;
};

const Btns = ({ setFilteredApps, appStatus, setAppStatus }: BtnsProps) => {
  const handleRadioChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    switch (value) {
      case AppStatus.all:
        setFilteredApps(appsList);
        setAppStatus(AppStatus.all);
        break;
      case AppStatus.active:
        setFilteredApps(
          appsList.filter((app) => app.status === AppStatus.active)
        );
        setAppStatus(AppStatus.active);
        break;
      case AppStatus.inactive:
        setFilteredApps(
          appsList.filter((app) => app.status === AppStatus.inactive)
        );
        setAppStatus(AppStatus.inactive);
        break;
      default:
        break;
    }
  };
  return (
    <Radio.Group
      rootClassName=""
      defaultValue={appStatus}
      buttonStyle="solid"
      onChange={handleRadioChange}
    >
      <Radio.Button value={AppStatus.all}>All</Radio.Button>
      <Radio.Button value={AppStatus.active}>Active</Radio.Button>
      <Radio.Button value={AppStatus.inactive}>Inactive</Radio.Button>
    </Radio.Group>
  );
};
export default Btns;