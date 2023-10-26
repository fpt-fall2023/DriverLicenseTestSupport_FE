import { Form, Input, Modal, TimePicker, notification } from "antd"
import { addSlot } from "../../../../apis/SlotService"
import dayjs from "dayjs"
const AddModal = ({ isAdding, setIsAdding, getSlot }) => {
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }
    const format = 'HH:mm';
    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        console.log(dayjs(values.time).format(format))
        addSlot(dayjs(values.time).format(format)).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm slot thành công!"
                })
                setIsAdding(false)
                getSlot()
            }
            
        }).catch((err) => {
            console.log(err.response.status)
            if(err.response.status === 500){
                notification.error({
                    message: "Slot bị trùng"
                })
            }else{
                notification.error({
                    message: "Thêm slot thất bại!"
                })
            }
            
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                title="Thêm slot"
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
export default AddModal
