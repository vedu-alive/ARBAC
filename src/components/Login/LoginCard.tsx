import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { passwordRegex } from "@/utils";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import { SetStateAction, useEffect, useState } from "react";
import GoogleIcon from "@/assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import {
  useLoginMutation,
  useOAuthLoginMutation,
} from "@/redux/services/authentication";
import { useNotificationContext } from "@/context/notificationContext";
import { useNavigate } from "react-router";
import CustomDivider from "../CustomDivider";
type Props = {
  step: SetStateAction<number>;
  setStep: (value: SetStateAction<number>) => void;
};

const EmailCard: React.FC<Props> = ({ step, setStep }) => {
  const [loginCreds, setLoginCreds] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });
  const { openNotificationWithIcon, contextHolder } = useNotificationContext();
  const [login, { data: loginData, error: loginError }] = useLoginMutation();
  const [checkbox, setCheckbox] = useState(false);
  const [oAuthLogin, { data: oAuthLoginData, error: oAuthError }] =
    useOAuthLoginMutation();
  const navigate = useNavigate();
  const [form] = useForm();
  const handleGooleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => await oAuthLogin(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleEmailSubmit = (value: { userName: string }) => {
    if (checkbox) {
      localStorage.setItem("userCredentials", JSON.stringify(value));
    }
    setLoginCreds({ ...loginCreds, userName: value.userName });
    setStep(Number(step) + 1);
  };
  const handlePasswordSubmit = async (value: { password: string }) => {
    if (checkbox) {
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({ ...loginCreds, password: value.password })
      );
    }
    setLoginCreds({
      ...loginCreds,
      password: value.password,
    });
    await login({ email: loginCreds.userName, password: loginCreds.password });
  };

  useEffect(() => {
    if (oAuthLoginData) {
      openNotificationWithIcon("success", {
        message: "Login Success",
        description: "You have successfully logged in",
        duration: 1,
        onClose: () => navigate("/dashboard"),
      });
    }
    if (oAuthError) {
      if ("data" in oAuthError) {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description:
            typeof oAuthError.data === "object" &&
            oAuthError.data &&
            "error_description" in oAuthError.data
              ? (oAuthError.data as { error_description: string })
                  .error_description
              : "An unknown error occurred",
        });
      } else {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description: "An unknown error occurred",
        });
      }
    }
  }, [oAuthLoginData, oAuthError]);

  useEffect(() => {
    if (loginData) {
      openNotificationWithIcon("success", {
        message: "Login Success",
        description: "You have successfully logged in",
        duration: 1,
        onClose: () => navigate("/dashboard"),
      });
    }
    if (loginError) {
      if ("data" in loginError) {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description:
            typeof loginError.data === "object" &&
            loginError.data &&
            "error" in loginError.data
              ? (loginError.data as { error: string }).error
              : "An unknown error occurred",
        });
      } else {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description: "An unknown error occurred",
        });
      }
    }
  }, [loginData, loginError]);

  useEffect(() => {
    const usersCreds = localStorage.getItem("userCredentials");
    if (usersCreds) {
      const { userName, password } = JSON.parse(usersCreds);
      form.setFieldsValue({ userName, password });
    }
  }, []);

  return (
    <Flex
      vertical
      className="email-card"
      gap={"1rem"}
      style={{ width: "100%" }}
    >
      {contextHolder}
      <p className="banner-txt">{"Welcome back!"}</p>
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
              <Checkbox
                name="rememberMe"
                onChange={(e) => setCheckbox(e.target.checked)}
              >
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
          layout="vertical"
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
              label={"Password"}
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
      <CustomDivider children={"or"} />
      <Flex gap={"0.5rem"} vertical>
        <Button
          type="default"
          style={{ height: "2.5rem" }}
          onClick={() => handleGooleLogin()}
        >
          <Flex gap={14} align="center" justify="center">
            <GoogleIcon />
            {"Continue with Google"}
          </Flex>
        </Button>
      </Flex>
      <Typography.Text style={{ margin: "auto" }}>
        Don't have an account?{" "}
        <Typography.Link onClick={() => navigate("/signup")}>
          Sign up
        </Typography.Link>
      </Typography.Text>
    </Flex>
  );
};

export default EmailCard;
