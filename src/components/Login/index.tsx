import { Flex } from 'antd'
import './index.css'
import EmailCard from './LoginCard'
import { useState } from 'react'
type Props = {}

const index = (props: Props) => {
  const [step, setStep] = useState(1);
  return (
    <Flex vertical align='center' justify='center' className='login'>
        <div>
            <EmailCard step={step} setStep={setStep} />
        </div>
    </Flex>
  )
}

export default index