import { Form, Input, Modal, notification } from "antd"
import { addTrafficCategory } from "../../../../apis/TrafficSignService"
const AddModal = ({ isAdding, setIsAdding, getTrafficCategories }) => {
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        addTrafficCategory(values.trafficType).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm danh mục thành công!"
                })
                form.resetFields()
                setIsAdding(false)
                getTrafficCategories()
            }
        }).catch((err) => {
            notification.error({
                message: "Thêm danh mục thất bại!"
            })
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                title="Thêm danh mục"
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
                        label="Danh mục"
                        name="trafficType"
                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal
