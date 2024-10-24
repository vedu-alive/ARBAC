import { Button, Flex, Form, Input, Typography } from "antd";
import CustomDivider from "../CustomDivider";
import GoogleIcon from "@/assets/google.svg";
import { passwordRegex } from "@/utils";
import { useNotificationContext } from "@/context/notificationContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useOAuthLoginMutation, useRegisterMutation } from "@/redux/services/authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import './index.css'

const SignupCard = () => {
  const { openNotificationWithIcon, contextHolder } = useNotificationContext();
  const [Signup,{data:signupData, error:signupError}] = useRegisterMutation();
  const navigate = useNavigate();
  const [login, { data: loginData, error }] = useOAuthLoginMutation();
  const [form] = Form.useForm();
  const handleGooleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => await login(tokenResponse),
    onError: (error) => console.log(error),
  });
    const handleSignin = async (values: { name: string; userName: string; password: string }) => {
        await Signup({ name: values.name, userName: values.userName, password: values.password });
    };
  useEffect(() => {
    if (loginData) {
      openNotificationWithIcon("success", {
        message: "Login Success",
        description: "You have successfully logged in",
        duration: 1,
        onClose: () => navigate("/dashboard"),
      });
    }
    if (error) {
      if ("data" in error) {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description:
            (error.data as any)?.error_description ||
            "An unknown error occurred",
        });
      } else {
        openNotificationWithIcon("error", {
          message: "Login Failed",
          description: "An unknown error occurred",
        });
      }
    }
  }, [loginData, error]);
    
    useEffect(() => {
    if (signupData) {
      openNotificationWithIcon("success", {
        message: "Signup Success",
        description: "You have successfully signed up",
        duration: 1,
        onClose: () => navigate("/login"),
      });
    }
    if (signupError) {
      if ("data" in signupError) {
        openNotificationWithIcon("error", {
          message: "Signup Failed",
          description:
            typeof signupData.data === "object" && signupData.data && "error" in signupData.data ? (signupData.data as { error: string }).error : 
            "An unknown error occurred",
        });
      } else {
        openNotificationWithIcon("error", {
          message: "Signup Failed",
          description: "An unknown error occurred",
        });
      }
    }
  },[signupData,signupError])
  return (
    <Flex vertical className="email-card" gap={"1rem"}>
      {contextHolder}
      <Form
        layout="vertical"
        requiredMark={false}
        className="login-card"
        form={form}
        onFinish={handleSignin}
      >
        <p className="banner-txt">{"Create an account!"}</p>
        <Flex vertical justify="center" style={{ width: "100%" }}>
          <Form.Item
            name={"name"}
            label={"Name"}
            rules={[{ required: true, message: "Please provide your name." }]}
          >
            <Input
              style={{ height: "2.5rem" }}
              type="text"
              placeholder="Enter name"
              allowClear
            />
          </Form.Item>
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
          <Form.Item
            name={"password"}
            label={"Password"}
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
            type="primary"
            style={{ height: "2.5rem", marginTop: "1rem" }}
            htmlType="submit"
          >
            {"Sign Up"}
          </Button>
        </Flex>
      </Form>
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
        Already have an account?{" "}
        <Typography.Link onClick={() => navigate("/login")}>
          Login In
        </Typography.Link>
      </Typography.Text>
    </Flex>
  );
};

export default SignupCard;
