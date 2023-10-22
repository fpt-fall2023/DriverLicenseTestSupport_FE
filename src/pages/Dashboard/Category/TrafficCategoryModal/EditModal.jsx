import { Form, Input, Modal, notification } from "antd"
import { updateTrafficCategory } from "../../../../apis/TrafficSignService"
const EditModal = ({ isEditing, setIsEditing, categoryData, getTrafficCategories }) => {
    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const onFinish = (values) => {
        form.resetFields()
        console.log(categoryData._id)
        updateTrafficCategory(categoryData._id, values.trafficType).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: "Sửa danh mục thành công!"
                })
                setIsEditing(false)
                getTrafficCategories()
            }
        }).catch((err) => {
            notification.error({
                message: "Sửa danh mục thất bại!"
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
                    initialValues={form.setFieldsValue(categoryData)}
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
export default EditModal