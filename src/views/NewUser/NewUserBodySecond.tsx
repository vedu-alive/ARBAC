import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  SelectProps,
  Space,
} from "antd";
import "./NewUser.css";
import { PlusOutlined } from "@ant-design/icons";
import ArrowLeftIcon from "@/assets/arrowLeftIcon.svg";
import OpenInNewIcon from "@/assets/OpenInNewIcon.svg";
import InfoIcon from "@/assets/infoIcon.svg";
import AddIcon from "@/assets/addIcon.svg";
import { useEffect, useState } from "react";
import AppPermissionModal from "./AppPermissionModal";
import { inviteGroup, rolesOptions } from "@/mock";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/types";
import { reset, setPermissions, usersData } from "@/redux/slices/Administration/users";
import { useForm } from "antd/es/form/Form";
import { convertTableData } from "@/utils";
import { useCreateUserMutation } from "@/redux/services/Administration";
import { ArgsProps } from "antd/es/notification";
import { useNotificationContext } from "@/context/notificationContext";
type Props = {
  current: number;
  setCurrent: (current: number) => void;
};

const NewUserBodySecond = ({ current, setCurrent }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUsers, { data:addUsersData, isLoading, error, isSuccess }] = useCreateUserMutation();
  const { openNotificationWithIcon, contextHolder } = useNotificationContext();
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
  const userData = useSelector(usersData);
  const [form] = useForm<{ group: string[]; role: string }>();

  useEffect(() => {
    if(userData.permission.group){
      form.setFieldsValue({group: userData.permission.group, role: userData.permission.role})
    }
  },[])


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

  const handleFormSubmit = async () => {

    const { userDetails, savedApplications, permission } = userData;
    const { group, role } = permission;
    try {
      const data = {
        group,
        role,
        userDetails,
        applications: convertTableData(savedApplications),
      };
      const response = await addUsers(data);
      if(response.error){
        throw new Error(response.error as string)
      }
      form.resetFields();
      dispatch(reset());
    }
    catch (error) {
      console.log(error, "error");
      openNotificationWithIcon("error", {
        message: "Error",
        description: error ? error as string : "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const args: ArgsProps = {
        message: "Success",
        description: addUsersData.message,
        onClose: () => navigate(-1),
        duration: 1,
      };
      openNotificationWithIcon("success", args);
    }
  }, [isSuccess])
  
  useEffect(() => {
    if (error) {
      const args: ArgsProps = {
        message: "Error",
        description: error ? error as string : "Something went wrong",
      };
      openNotificationWithIcon("error", args);
    }
  })

  return (
    <div className="newUserBody-second">
      {contextHolder}
      <p className="second-userBody-headings">
        {"Role and Group Permission Information"}
      </p>
      <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
        <Form.Item label={"Select Group(s) (Optional)"} name={"group"}>
          <Select
            options={groupItems}
            mode="multiple"
            onChange={(value) =>
              dispatch(setPermissions({ ...userData.permission, group: value }))
            }
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
        <Form.Item label={"Select Role"} name={"role"} rules={[{required: true, message: "Please select a role"}]}>
          <Select
            options={roleItems}
            onSelect={(value) =>
              dispatch(setPermissions({ ...userData.permission, role: value }))
            }
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
        <Form.Item label={"Select Application (Optional)"} rules={[{
          required: true,
          validator(_rules, _value:unknown, callback) {
            if (userData.savedApplications.length === 0) {
              callback("Please select atleast one application");
            } else {
              callback();
            }
          },
        }]}>
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
          <Button className="newUser-btn" htmlType="submit" type="default" loading={isLoading}>
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewUserBodySecond;
