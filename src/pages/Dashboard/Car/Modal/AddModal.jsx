import { Form, Input, Modal, DatePicker, notification, Select } from "antd"
import { addCar } from "../../../../apis/CarService"
const AddModal = ({ isAdding, setIsAdding, getCourse }) => {
    const mainLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
        size: "large"
    }

    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        addCar(values.name, values.brand, values.licensePlate, values.status).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm xe thành công!"
                })
                setIsAdding(false)
                getCourse()
            }

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                title="Thêm xe"
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
                    <Form.Item
                        label="Xe : "
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập xe" }]}
                    >
                        <Input placeholder="Nhập xe" />
                    </Form.Item>
                    <Form.Item
                        label="Hãng : "
                        name="brand"
                        rules={[{ required: true, message: "Vui lòng nhập hãng xe" }]}
                    >
                        <Input
                            placeholder="Nhập hãng xe"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Bảng số : "
                        name="licensePlate"
                        rules={[{ required: true, message: "Vui lòng nhập bảng số xe" }]}
                    >
                        <Input
                            placeholder="Nhập bảng số xe"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal
