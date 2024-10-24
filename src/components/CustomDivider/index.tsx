import React, { CSSProperties } from 'react'
import './index.css'
import { Flex } from 'antd'
type Props = {
  children: React.ReactNode | string
  lineColor?: CSSProperties['borderColor']
}

const CustomDivider = ({children,lineColor}: Props) => {
  return (
    <Flex justify='center' align='center' className='customDivider-wrapper'>
      <div className="customDivider" style={{ borderColor: lineColor }} />
      <div className="customDivider-child">{children}</div>
      <div className="customDivider" style={{ borderColor: lineColor }} />
    </Flex>
  );
}

export default CustomDivider