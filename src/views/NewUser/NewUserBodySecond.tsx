import { Button, Divider, Flex, Form, Input, Select, SelectProps, Space } from 'antd';
import './NewUser.css'
import { PlusOutlined } from "@ant-design/icons";
import ArrowLeftIcon from '@/assets/arrowLeftIcon.svg'
import OpenInNewIcon from '@/assets/OpenInNewIcon.svg'
import InfoIcon from '@/assets/infoIcon.svg'
import AddIcon from '@/assets/addIcon.svg'
import { useState } from 'react';
import AppPermissionModal from './AppPermissionModal';
import { inviteGroup, rolesOptions } from '@/mock';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/types';
import { reset, setPermissions } from '@/redux/slices/Administration/users';
type Props = {
  current: number;
  setCurrent: (current: number) => void;
}

const NewUserBodySecond = ({ current, setCurrent }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleItems, setRoleItems] = useState<SelectProps["options"]>(
    rolesOptions ? [...rolesOptions] : []
  );
  const [groupItems, setGroupItems] = useState<SelectProps["options"]>(
    inviteGroup ? [...inviteGroup] : []
  );
  const [newRoleName, setNewRoleName] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  //*need to make API call for data persistancy
  const addNewRole = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setRoleItems([
      { label: newRoleName, value: newRoleName },
      ...(roleItems || []),
    ]);
    setNewRoleName("");
  };

  //*need to make API call for data persistancy
  const addNewGroup = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setGroupItems([
      { label: newGroupName, value: newGroupName },
      ...(groupItems || []),
    ]);
    setNewGroupName("");
  };

  const handleFormSubmit = ((values:{group:string[], role:string}) => {
    console.log(values, "formValues");
    dispatch(setPermissions({
      group: values?.group,
      role: values?.role,
      application: null
    }));

    //*after Api call
    dispatch(reset());
    navigate(-1);
  })
  return (
    <div className="newUserBody-second">
      <p className="second-userBody-headings">
        {"Role and Group Permission Information"}
      </p>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label={"Select Group(s) (Optional)"} name={'group'}>
          <Select
            options={groupItems}
            mode="multiple"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Flex vertical gap={"1rem"} style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="new group name"
                    value={newGroupName}
                    onChange={(event) => setNewGroupName(event.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addNewGroup}
                    >
                      Create Group
                    </Button>
                  </Space>
                </Flex>
              </>
            )}
          />
        </Form.Item>
        <Form.Item label={"Select Role"} name={'role'}>
          <Select
            options={roleItems}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Flex vertical gap={"1rem"} style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="new role name"
                    value={newRoleName}
                    onChange={(event) => setNewRoleName(event.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addNewRole}
                    >
                      Create Role
                    </Button>
                  </Space>
                </Flex>
              </>
            )}
          />
        </Form.Item>
        <p className="second-userBody-headings">{"Assign Application"}</p>
        <Form.Item label={"Select Application (Optional)"}>
          <div className="select-app-div" onClick={() => setIsModalOpen(true)}>
            <AddIcon />
            {"Click here to set Application permission"}
          </div>
          <AppPermissionModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Form.Item>
        <p className="info-txt-typo">
          <InfoIcon />
          {"You can assign app permissions later in the"}
          <span>
            {" Application Management"} <OpenInNewIcon />
          </span>
          {"tab"}
        </p>
        <div className="second-body-footer">
          <div
            className="second-back-btn"
            onClick={() => setCurrent(current - 1)}
          >
            <ArrowLeftIcon />
            {"Back to User Details"}
          </div>
          <Button className="newUser-btn" htmlType="submit" type="default">
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewUserBodySecond