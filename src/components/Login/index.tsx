import { Flex } from 'antd'
import './index.css'
import EmailCard from './LoginCard'
import { useEffect, useState } from 'react'
import { WelcomeText } from './loginbanner'
import { useNavigate } from 'react-router-dom'
import { checkToken } from '@/utils'

const index = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    checkToken() && navigate("/dashboard", { replace: true });
  }, []);
  return (
    <Flex vertical align="center" justify="center" className="login">
      <WelcomeText />
      <div>
        <EmailCard step={step} setStep={setStep} />
      </div>
    </Flex>
  );
}

export default index