import { Form, Input, Modal, Select, notification } from 'antd';
import { addSampleTest } from '../../../../apis/SampleTestService';
import { useState } from 'react';

const AddModal = ({ isOpen, setIsOpen, questionBank, getAllSampleTest }) => {
  const [driveType, setDriveType] = useState('');
  // const mainLayout = {
  //     labelCol: { span: 4 },
  //     wrapperCol: { span: 20 },
  //     size: "large"
  // }

  const [form] = Form.useForm();

  const onFinish = (values) => {
    addSampleTest(values.sampleTestName, values.questionBankName, driveType)
      .then((res) => {
        if (res.status === 201) {
          setIsOpen(false);
          notification.success({
            message: 'Thêm thành công',
          });
          form.resetFields();
          getAllSampleTest();
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message:
            'Thêm thất bại. Hãy chắc rằng tên không trùng với bài thi thử khác!',
        });
      });
  };

  return (
    <div>
      <Modal
        title="Thêm bài thi thử"
        open={isOpen}
        okText="Thêm"
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          // {...mainLayout}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên bài thi"
            name="sampleTestName"
            rules={[{ required: true, message: 'Vui lòng nhập tên bài thi!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đề"
            name="questionBankName"
            rules={[
              { required: true, message: 'Vui lòng chọn 1 ngân hàng đề!' },
            ]}
          >
            <Select placeholder="Chọn ngân hàng đề">
              {questionBank.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  <div onClick={() => setDriveType(item.driveType)}>
                    {item.questionBankName} - {item.driveType}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
                    label="Loại bằng"
                    name="driveType"
                    rules={[{ required: true, message: "Vui lòng chọn loại bằng!" }]}
                    >
                        <Select
                        disabled
                        />
                    </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};
export default AddModal;
