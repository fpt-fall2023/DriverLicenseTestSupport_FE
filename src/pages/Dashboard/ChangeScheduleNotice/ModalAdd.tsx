import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React, { useReducer } from 'react';


const initialState = {

}

function reducer(state, action) {
  switch (action.type) {
    case 'date':
      return {};
    default:
      throw new Error('action unkown');
  }
}

export const ModalAdd = ({ isModalOpen, handleOk, handleCancel }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (_, dateString) => {
    console.log(dateString);
  };

  return (
    <Modal
      title={
        <div>
          <strong>Tạo thông báo</strong>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ marginRight: '7px' }}>Ngày giáo viên vắng</strong>
            <DatePicker onChange={onChange} />
          </div>
        </div>
      }
      open={isModalOpen}
      onOk={() => handleOk({ type: 'showModal' })}
      onCancel={() => handleCancel({ type: 'showModal' })}
    >
      <Form
        layout={'vertical'}
        // form={form}
        // onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Lời nhắn">
          <Input placeholder="thêm thông báo tới học viên" />
        </Form.Item>
        <Form.Item label="Giáo viên vắng">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Ngày dời lịch dự kiến">
          <DatePicker onChange={onChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
