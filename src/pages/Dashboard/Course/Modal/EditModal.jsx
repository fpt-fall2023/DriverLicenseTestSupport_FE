import { Form, Input, Modal, DatePicker, notification } from "antd"
import { updateCourse } from "../../../../apis/CourseService"
import dayjs from "dayjs"
const EditModal = ({ isEditing, setIsEditing, courseData, getCourse }) => {
    const [form] = Form.useForm()
    const format = 'YYYY-MM-DD';
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const onFinish = (values) => {
        form.resetFields()
        console.log(courseData._id)
        console.log(values)
        const [startDate , endDate] = values.date
        updateCourse(courseData._id, values.courseName, values.description,dayjs(startDate).format(format), dayjs(endDate).format(format)).then((res) => {
            if (res.status === 200) {
                notification.success({
                    message: "Sửa thành công!"
                })
                setIsEditing(false)
                getCourse()
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
                    initialValues={form.setFieldsValue(courseData)}
                    // initialValues={{
                    //     courseName : courseData.courseName
                        
                    // }}
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
                        <DatePicker.RangePicker    format={format} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default EditModal