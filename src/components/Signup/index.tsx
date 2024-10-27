import { Flex } from "antd";
import SignupCard from "./SignupCard";
import { WelcomeText } from "../Login/loginbanner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "@/utils";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken() && navigate("/dashboard", { replace: true });
  }, []);
  return (
      <Flex vertical align="center" justify="center" className="signup">
        <WelcomeText/>
        <SignupCard />
    </Flex>
  );
};

export default Signup;
