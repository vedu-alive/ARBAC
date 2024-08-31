import { Button, Form, Input, Select, SelectProps } from 'antd';
import './NewUser.css'
import OptionsCard from './OptionsCard';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import EyeIcon from '../../assets/eyeIcon.svg';
import EyeCloseIcon from '../../assets/eyeCloseIcon.svg';

const departmentOptions: SelectProps['options'] = [
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Testing', value: 'Testing' },
  { label: 'HR Executive', value: 'HR Executive' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Management', value: 'Management' },
  { label: 'product Analyst', value: 'product Analyst' },
  { label: 'Sr Software Engineer', value: 'Sr Software Engineer' },
  { label: 'Jr Software Engineer', value: 'Jr Software Engineer' },
  { label: 'IT-Vendor', value: 'IT-Vendor' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Others', value: 'Others'}
];
type NewUserBodyProps = {
  current: number;
  setCurrent: (value: React.SetStateAction<number>) => void;
};
const NewUserBody = ({ current, setCurrent }: NewUserBodyProps) => {
  const selectedOptions:string[] = [];
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [form] = useForm();
  const handleFinish = (values: any) => {
    console.log(values);
    console.log(selectedOptions);
    setCurrent(current + 1);
  };
  return (
    <div className="newUser-body">
      <p className="newUser-headings">{"Create new User"}</p>
      <OptionsCard selectedOptions={selectedOptions} />
      <p className="help-typo">{"Help me decide"}</p>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Full Name" name="userName">
          <Input
            placeholder="Enter user's full name (e.g Jackson Serrif)"
            name="userName"
          />
        </Form.Item>
        <div className="sideComp">
          <Form.Item label="Department" name="department" style={{ flex: 1 }}>
            <Select
              options={departmentOptions}
              placeholder={"Select department"}
            />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle" style={{ flex: 1 }}>
            <Input
              placeholder="Enter user's job title (e.g Software Engineer)"
              name="jobTitle"
            />
          </Form.Item>
        </div>
        <p className="newUser-headings">Authentication Details</p>
        <Form.Item label="Create Password" name="password">
          <Input
            name="password"
            placeholder="Enter a string password "
            type={showPass ? "text" : "password"}
            suffix={<span style={{cursor: 'pointer'}} onClick={()=>setShowPass(prev=>!prev)}>{showPass ? <EyeIcon /> : <EyeCloseIcon />}</span>}
          />
        </Form.Item>
        <Form.Item label="Re-Enter Password" name="confirmPassword">
          <Input
            name="confirmPassword"
            placeholder="Re-Enter password"
            type={showRePass ? "text" : "password"}
            suffix={<span style={{cursor: 'pointer'}} onClick={()=>setShowRePass(prev=>!prev)}>{showRePass ? <EyeIcon /> : <EyeCloseIcon />}</span>}
          />
        </Form.Item>
        <Button htmlType="submit" type="default" rootClassName="newUser-btn">
          {"Save & Next"}
        </Button>
      </Form>
    </div>
  );
};

export default NewUserBody