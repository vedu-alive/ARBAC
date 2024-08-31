import { Button, Form, Select } from 'antd';
import './NewUser.css'
import ArrowLeftIcon from '../../assets/arrowLeftIcon.svg'
import OpenInNewIcon from '../../assets/OpenInNewIcon.svg'
import InfoIcon from '../../assets/infoIcon.svg'
import AddIcon from '../../assets/addIcon.svg'
import { useState } from 'react';
import AppPermissionModal from './AppPermissionModal';
type Props = {
  current: number;
  setCurrent: (current: number) => void;
}

const NewUserBodySecond = ({ current, setCurrent }: Props) => {
  const [isModalOpen, setIsModalOpen] =useState(false);
  return (
    <div className="newUserBody-second">
      <p className="second-userBody-headings">
        {"Role and Group Permission Information"}
      </p>
      <Form layout="vertical">
        <Form.Item label={"Select Group(s) (Optional)"}>
          <Select />
        </Form.Item>
        <Form.Item label={"Select Role"}>
          <Select />
        </Form.Item>
        <p className="second-userBody-headings">{"Assign Application"}</p>
        <Form.Item label={"Select Application (Optional)"}>
          <div className='select-app-div' onClick={()=>setIsModalOpen(true)}>
            <AddIcon />
            {"Click here to set Application permission"}
          </div>
          <AppPermissionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Form.Item>
        <p className="info-txt-typo">
          <InfoIcon />
          {"You can assign app permissions later in the"}
          <span>
            {" Application Management"} <OpenInNewIcon />
          </span>
          {"tab"}
        </p>
        <div className='second-body-footer'>
          <div
            className="second-back-btn"
            onClick={() => setCurrent(current - 1)}
          >
            <ArrowLeftIcon />
            {"Back to User Details"}
          </div>
          <Button className="newUser-btn" htmlType="submit" type="default">
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewUserBodySecond