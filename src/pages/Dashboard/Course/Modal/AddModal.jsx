import { Form, Input, Modal, DatePicker, notification } from "antd"
import { addCourse } from "../../../../apis/CourseService"
import dayjs from "dayjs"
const AddModal = ({ isAdding, setIsAdding, getCourse }) => {
    const mainLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
        size: "large"
    }
    const format = 'YYYY-MM-DD';
    const [form] = Form.useForm()

    const onFinish = (values) => {
        form.resetFields()
        const [startDate , endDate] = values.date
        console.log(dayjs(startDate).format(format))
        console.log(dayjs(endDate).format(format))
        addCourse(values.courseName, values.description, dayjs(startDate).format(format), dayjs(endDate).format(format)).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm khóa học thành công!"
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
                title="Thêm khóa học"
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
                        label="Khóa học : "
                        name="courseName"
                        rules={[{ required: true, message: "Vui lòng nhập khóa học" }]}
                    >
                        <Input placeholder="Nhập text" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả : "
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    >
                        <Input.TextArea
                            placeholder="Nhập text"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian : "
                        name="date"
                        rules={[{ required: true, message: "Vui lòng nhập thời gian" }]}
                        
                    >
                        <DatePicker.RangePicker  format={format} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal
