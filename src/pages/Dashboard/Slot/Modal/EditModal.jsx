import { Form, Input, Modal, TimePicker, notification } from "antd"
import { updateSlot } from "../../../../apis/SlotService"
import dayjs from "dayjs"
const EditModal = ({ isEditing, setIsEditing, slotData, getSlot }) => {
    const [form] = Form.useForm()
    const format = "HH:mm"
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const onFinish = (values) => {
        form.resetFields()
        console.log(slotData._id)
        updateSlot(slotData._id, values).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: "Sửa thành công!"
                })
                setIsEditing(false)
                getSlot()
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
                    initialValues={form.setFieldsValue(dayjs(slotData, format))}
                >
                    <Form.Item
                        label="Thời gian : "
                        name="time"
                        rules={[{ required: true, message: "Vui lòng nhập thời gian" }]}
                    >
                        <TimePicker  format={format} />
                        
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default EditModal