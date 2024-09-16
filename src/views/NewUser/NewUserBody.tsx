import { Button, Form, Input, Select } from "antd";
import "./NewUser.css";
import OptionsCard from "./OptionsCard";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import EyeIcon from "../../assets/eyeIcon.svg";
import EyeCloseIcon from "../../assets/eyeCloseIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  usersData,
} from "../../redux/slices/Administration/users";
import { departmentOptions } from "../../mock";
import { Values } from "../../constants/enums";
import { AppDispatch } from "../../types";

type NewUserBodyProps = {
  current: number;
  setCurrent: (value: React.SetStateAction<number>) => void;
};

type formValuesType = {
  confirmPassword: string;
  department: string;
  jobTitle: string;
  password: string;
  userName: string;
};
const NewUserBody = ({ current, setCurrent }: NewUserBodyProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Values>(Values.createType);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const { userDetails } = useSelector(usersData);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm<formValuesType>();
  const handleFinish = async (values: formValuesType) => {
    try {
      await form.validateFields();
      selectedOptions && dispatch(
        setUserDetails({
          confirmPassword: values.confirmPassword,
          createType: selectedOptions,
          department: values.department,
          jobTitle: values.jobTitle,
          name: values.userName,
          password: values.password,
        })
      );
      setCurrent(current + 1);
    } catch (error) {}
  };
  useEffect(() => {
    if (userDetails) {
      if (!Object.values(userDetails).some(items => items === "" || items === null))
      {
        form.setFieldsValue({
          userName: userDetails.name,
          confirmPassword: userDetails.confirmPassword,
          department: userDetails.department,
          jobTitle: userDetails.jobTitle,
          password: userDetails.password,
        });
        setSelectedOptions(userDetails.createType as Values);
      }
    }
  }, [userDetails]);

  return (
    <div className="newUser-body">
      <p className="newUser-headings">{"Create new User"}</p>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <OptionsCard selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
        <a className="help-typo" target="_blank" href="/help-decide-user">{"Help me decide"}</a>
        <Form.Item label="Full Name" name="userName">
          <Input
            placeholder="Enter user's full name (e.g Jackson Serrif)"
            name="userName"
          />
        </Form.Item>
        <div className="sideComp">
          <Form.Item
            label="Department"
            name="department"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
                message: "Please select a department!",
              },
            ]}
          >
            <Select
              options={departmentOptions}
              placeholder={"Select department"}
            />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle" style={{ flex: 1 }}>
            <Input
              placeholder="Enter user's job title (e.g Software Engineer)"
              name="jobTitle"
            />
          </Form.Item>
        </div>
        <p className="newUser-headings">Authentication Details</p>
        <Form.Item
          label="Create Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Password must be minimum of 8 characters",
            },
            {
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
              ),
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            },
          ]}
        >
          <Input
            name="password"
            placeholder="Enter a string password "
            type={showPass ? "text" : "password"}
            suffix={
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeIcon /> : <EyeCloseIcon />}
              </span>
            }
          />
        </Form.Item>
        <Form.Item
          label="Re-Enter Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              validator: async (_, value) => {
                if (value !== form.getFieldValue("password")) {
                  return Promise.reject(new Error("Passwords does not match!"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="confirmPassword"
            placeholder="Re-Enter password"
            type={showRePass ? "text" : "password"}
            suffix={
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setShowRePass((prev) => !prev)}
              >
                {showRePass ? <EyeIcon /> : <EyeCloseIcon />}
              </span>
            }
          />
        </Form.Item>
        <Button htmlType="submit" type="default" rootClassName="newUser-btn">
          {"Save & Next"}
        </Button>
      </Form>
    </div>
  );
};

export default NewUserBody;
