import { Form, Input, Modal, notification } from "antd"
import { updateCategory } from "../../../../apis/QuestionService"

const EditModal = ({ isEditing, setIsEditing, categoryData, getQuestionCategory }) => {
    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const onFinish = (values) => {
        form.resetFields()
        console.log(categoryData._id)
        updateCategory(categoryData._id, values.questionType).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: "Sửa danh mục thành công!"
                })
                setIsEditing(false)
                getQuestionCategory()
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
                        name="questionType"
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