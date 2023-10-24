import { Form, Input, Modal, notification, Select } from "antd"
import { addUser } from "../../apis/AdminService"

const AddModal = ({ isAdding, setIsAdding, getUser }) => {
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        addUser(values.name, values.role).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm người dùng thành công"
                })
                setIsAdding(false)
                getUser()
            }
        }).catch((err) => {
            notification.error({
                message: "Thêm người dùng thất bại"
            })
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                title="Thêm người dùng"
                open={isAdding}
                okText="Thêm"
                onCancel={() => setIsAdding(false)}
                onOk={() => {
                    form.submit();
                }}
            >
                <Form
                    form={form}
                    {...mainLayout}
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Chưa có tên người dùng' }]}>
                                <Input label="Nhập tên" />
                            </Form.Item>
                            <Form.Item name={"role"} label="vai trò"
                                rules={[
                                    {
                                        required: true,
                                        message: 'chưa chọn loại vai trò',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn loại vai trò"
                                >
                                    <Select.Option value={"admin"}>Admin</Select.Option>
                                    <Select.Option value={"user"}>Người dùng</Select.Option>
                                    <Select.Option value={"staff"}>Nhân viên</Select.Option>
                                    <Select.Option value={"teacher"}>Người dạy</Select.Option>
                                </Select>
                            </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal