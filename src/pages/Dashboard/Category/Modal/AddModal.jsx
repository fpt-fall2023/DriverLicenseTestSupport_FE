import { Button, Form, Input, Modal, notification } from "antd"
import { addCategory } from "../../../../apis/QuestionService"

const AddModal = ({ isAdding, setIsAdding, getQuestionCategory }) => {
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        addCategory(values.questionType).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm danh mục thành công!"
                })
                setIsAdding(false)
                getQuestionCategory()
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
export default AddModal