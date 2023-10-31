import { Form, Input, Modal, notification, Select } from "antd"
import { addUser } from "../../apis/AdminService"
import { useState } from "react"
const AddModal = ({ isAdding, setIsAdding, getUser }) => {
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const [form] = Form.useForm()
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store the uploaded image URL
    const [uploading, setUploading] = useState(false);

    const uploadImage = (Image) => {
        const imageRef = ref(storage, `images/${Image}-${v4()}`); // link trong folder trong firebase 
        setUploading(true)
        uploadBytes(imageRef, Image)
            .then(() => {
                setUploading(false)
                getDownloadURL(imageRef).then((url) => {
                    setUploadedImageUrl(url); // Store the uploaded image URL
                });
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                setUploading(false)
            });
    };

    const onFinish = (values) => {
        form.resetFields()
        uploadImage(values.avatar.replace(/^.*[\\\/]/, ''))
        addUser(values.name, values.role, uploadedImageUrl).then((res) => {
            if (res.status === 201) {
                notification.success({
                    message: "Thêm người dùng thành công"
                })
                setIsAdding(false)
                getUser()
            }
        }).catch((err) => {
            notification.error({
                message: "Thêm người dùng thất bại"
            })
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                title="Thêm người dùng"
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
                    <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Chưa có tên người dùng' }]}>
                                <Input label="Nhập tên" />
                            </Form.Item>
                            <Form.Item name={"role"} label="vai trò"
                                rules={[
                                    {
                                        required: true,
                                        message: 'chưa chọn loại vai trò',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn loại vai trò"
                                >
                                    <Select.Option value={"admin"}>Admin</Select.Option>
                                    <Select.Option value={"user"}>Người dùng</Select.Option>
                                    <Select.Option value={"staff"}>Nhân viên</Select.Option>
                                    <Select.Option value={"teacher"}>Người dạy</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={"avatar"} rules={[{ required: true, message: 'Chưa có hình' }]}> 
                            <Input type="file"/>
                             </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal