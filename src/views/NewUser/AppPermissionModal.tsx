import { Modal } from "antd";
import { SetStateAction } from "react";
import "./NewUser.css";
import AppModal from "./AppModal";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (x: SetStateAction<boolean>) => void;
};

const AppPermissionModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        centered
        rootClassName="app-permission-modal"
        wrapClassName="app-permission-modal-wrap"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        title={null}
        closeIcon={null}
        width={"66.625rem"}
      >
        <div>
          <AppModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default AppPermissionModal;
