import { Form, Input, Modal, DatePicker, notification, Select } from "antd"
import { updateCar } from "../../../../apis/CarService"
const EditModal = ({ isEditing, setIsEditing, carData, getCar }) => {
    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const onFinish = (values) => {
        form.resetFields()
        console.log(values)
        updateCar(carData._id, values.name, values.brand, values.licensePlate, values.status).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: "Sửa thành công!"
                })
                setIsEditing(false)
                getCar()
            }
        }).catch((err) => {
            notification.error({
                message: "Sửa thất bại!"
            })
            console.log(err)
        })
     }

    return (
        <div>
            <Modal
                title="Sửa danh mục"
                open={isEditing}
                okText="Sửa"
                onCancel={() => setIsEditing(false)}
                onOk={() => {
                    form.submit();
            }}>
                <Form
                    form={form}
                    {...mainLayout}
                    onFinish={onFinish}
                    initialValues={form.setFieldsValue(carData)}
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
                    <Form.Item
                        label="Trạng thái : "
                        name="status"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                    >
                        <Select
                            placeholder="Chọn trạng thái"
                        >
                            <Select.Option value={"available"}>available</Select.Option>
                            <Select.Option value={"unavailable"}>unavailable</Select.Option>
                            <Select.Option value={"fixing"}>fixing</Select.Option>
                            <Select.Option value={"broken"}>broken</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default EditModal