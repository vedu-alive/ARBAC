import { Button, Flex, Form, Input, Typography } from "antd";
import CustomDivider from "../CustomDivider";
import GoogleIcon from "@/assets/google.svg";
import { passwordRegex, storeToken } from "@/utils";
import { useNotificationContext } from "@/context/notificationContext";
import { useGoogleLogin } from "@react-oauth/google";
import {
  useOAuthLoginMutation,
  useRegisterMutation,
} from "@/redux/services/authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./index.css";

const SignupCard = () => {
  const { openNotificationWithIcon, contextHolder } = useNotificationContext();
  const [Signup, { error: signupError }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [login, { data: error }] = useOAuthLoginMutation({});
  const [form] = Form.useForm();
  const handleGooleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await login(tokenResponse);
      if (res.data) {
        storeToken(res.data.token);
        navigate("/dashboard");
      }
    },
    onError: (error) => console.log(error),
  });
  const handleSignin = async (values: {
    name: string;
    userName: string;
    password: string;
  }) => {
    const res = await Signup({
      name: values.name,
      email: values.userName,
      password: values.password,
    });
    if (res.data) {
      storeToken(res.data.token);
      navigate("/dashboard");
    }
  };
  useEffect(() => {
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
  }, [error]);

  useEffect(() => {
    if (signupError) {
      if ("data" in signupError) {
        openNotificationWithIcon("error", {
          message: "Signup Failed",
          description:
            typeof signupError.data === "object" &&
            signupError.data &&
            "error" in signupError.data
              ? (signupError.data as { error: string }).error
              : "An unknown error occurred",
        });
      } else {
        openNotificationWithIcon("error", {
          message: "Signup Failed",
          description: "An unknown error occurred",
        });
      }
    }
  }, [signupError]);
  return (
    <Flex vertical className="signup-card" gap={"1rem"}>
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
