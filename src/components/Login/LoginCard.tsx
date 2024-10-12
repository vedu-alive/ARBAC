import { Button, Checkbox, Divider, Flex, Form, Input, Typography } from "antd";
import { passwordRegex } from "@/utils";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import { SetStateAction, useEffect, useState } from "react";
import GoogleIcon from "@/assets/google.svg";
type Props = {
  step: SetStateAction<number>;
  setStep: (value: SetStateAction<number>) => void;
};

const EmailCard: React.FC<Props> = ({ step, setStep }) => {
  const [loginCreds, setLoginCreds] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });
  const [form] = useForm();
  const handleEmailSubmit = (value: {userName: string}) => {
    console.log(value);
    setLoginCreds({ ...loginCreds, userName: value.userName });
    setStep(Number(step) + 1);
  };
  const handlePasswordSubmit = (value: { password: string }) => {
    setLoginCreds({
      ...loginCreds,
      password: value.password,
    });
  };
    useEffect(() => {
        if (loginCreds.userName) {
            form.setFieldsValue({ userName: loginCreds.userName });
        }
    })
  return (
    <Flex
      vertical
      className="email-card"
      gap={"1rem"}
      style={{ width: "100%" }}
    >
      <p className="banner-txt">{"Enter your credentials"}</p>
      {step === 1 && (
        <Form
          layout="vertical"
          requiredMark={false}
          className="login-card"
          form={form}
          onFinish={handleEmailSubmit}
        >
          <Flex vertical justify="center" style={{ width: "100%" }}>
            <Form.Item
              name={"userName"}
              validateTrigger={"onBlur"}
              label={"Email address"}
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input
                style={{ height: "2.5rem" }}
                type="text"
                placeholder="user name"
                allowClear
              />
            </Form.Item>
            <div>
              <Checkbox name="rememberMe">
                <p>Save my email address and login options</p>
              </Checkbox>
              <br />
              <small className="small-txt">
                Not recommended for public or shared computers
              </small>
            </div>
            <Button
              type="primary"
              style={{ height: "2.5rem", marginTop: "1.5rem" }}
              htmlType="submit"
            >
              {"Continue"}
            </Button>
          </Flex>
        </Form>
      )}
      {step === 2 && (
        <Form
          className="login-card"
          form={form}
          onFinish={handlePasswordSubmit}
        >
          <Flex vertical justify="center" style={{ width: "100%" }}>
            <Typography.Text className="cred-txt">
              <strong>{loginCreds.userName}</strong>
            </Typography.Text>
            <Typography.Link
              rootClassName="link-txt"
              onClick={() => setStep(Number(step) - 1)}
            >
              {"Log in as someone else"}
            </Typography.Link>
            <Form.Item
              name={"password"}
              validateTrigger={"onBlur"}
              rules={[
                { required: true, message: "Please enter your password!" },
                { pattern: passwordRegex, message: "Invalid password" },
              ]}
            >
              <Input.Password
                style={{ height: "2.5rem" }}
                placeholder="password"
              />
            </Form.Item>
            <Button
              style={{ height: "2.5rem", marginTop: "0.5rem" }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
            <Typography.Link className="forget-pass">
              Forget Password ?
            </Typography.Link>
          </Flex>
        </Form>
      )}
      <Divider />
      <Flex gap={"0.5rem"} vertical>
        <Button type="default" style={{height: '2.5rem'}}>
          <Flex gap={14} align="center" justify="center">
            <GoogleIcon />
            {"Signup with Google"}
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmailCard;
