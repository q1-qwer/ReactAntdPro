import React from 'react';
import { Modal } from 'antd';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >1
      {props.children}
    </Modal>
  );
};

export default CreateForm;