import { resetToken } from '@/redux/slices/authentication'
import { AppDispatch } from '@/types'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

type Props = {}

const Settings = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return <Button onClick={()=>dispatch(resetToken())}> Logout </Button>;
}

export default Settings