import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import UsersTab from "../UsersTab/UsersTab";

import './TabComponent.css'
const TabComponent = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" rootClassName="tabComponent">
        <TabPane tab="Users" key="1" className="users-tab">
          <UsersTab />
        </TabPane>
        <TabPane tab="Groups" key="2">
          <div>{"Groups"}</div>
        </TabPane>
        <TabPane tab="Permission requests" key="4">
          <div>{"Permissions"}</div>
        </TabPane>
        <TabPane tab="Deleted access" key="5">
          <div>{"access"}</div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabComponent