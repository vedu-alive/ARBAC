import { Flex } from "antd";
import SignupCard from "./SignupCard";
import { WelcomeText } from "../Login/loginbanner";

const Signup = () => {
  return (
      <Flex vertical align="center" justify="center" className="signup">
        <WelcomeText/>
        <SignupCard />
    </Flex>
  );
};

export default Signup;
