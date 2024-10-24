import { Flex } from "antd";
import Logo from '@/assets/logo.svg';
import "../index.css";
const WelcomeText = () => {
  return (
    <Flex className="welcome-text" align="center" justify="center" gap={4}>
      <Logo />
      <span>{"Auth"}</span>
      <span>{"Center"}</span>
    </Flex>
  );
};

export { WelcomeText };
