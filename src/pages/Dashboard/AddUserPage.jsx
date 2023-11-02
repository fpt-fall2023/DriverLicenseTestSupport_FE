import { Button, Form, Input, Modal, notification, Select, Space } from "antd"
import { addUser } from "../../apis/AdminService"
import { useState } from "react"
import { storage } from "../../components/upload_img/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const AddModal = ({ isAdding, setIsAdding, getUser }) => {
    const mainLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
        size: "large"
    }

    const [form] = Form.useForm()
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store the uploaded image URL
    const [uploading, setUploading] = useState(false);
    const [imageHere, setImageHere] = useState(null);

    const uploadImage = async () => {
        if (imageHere == null || uploading) return;
        const imageRef = ref(storage, `images/${imageHere.name}-${v4()}`); // link trong folder trong firebase 
        console.log(imageHere.name);
        setUploading(true)
        uploadBytes(imageRef, imageHere)
            .then(() => {
                setUploading(false)
                getDownloadURL(imageRef).then((url) => {
                    console.log(url)
                    setUploadedImageUrl(url); // Store the uploaded image URL
                    notification.success({
                        message: "Up ảnh thành công"
                    })
                });
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                setUploading(false)
            });
    };

    const validatePhoneNumber = (_, value) => {
        // Regular expression to match a valid phone number (10 digits)
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    
        if (!phoneRegex.test(value)) {
          return Promise.reject('Please enter a valid phone number (10 digits)');
        }
    
        return Promise.resolve();
      };

    const onFinish = (values) => {
        form.resetFields()
        console.log(imageHere)
        console.log(values.passwordConfirm)
        console.log(values.password)
        addUser(values.email, values.password, values.passwordConfirm, uploadedImageUrl,values.name, values.role, values.phone).then((res) => {
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
                    <Form.Item name="phone" label="SĐT" rules={[
                        {
                            validator: validatePhoneNumber,
                        }]}>
                        <Input label="Nhập email" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[
                        {
                            type: 'email',
                            message: 'email không hợp lệ',
                        },
                        {
                            required: true,
                            message: 'Chưa có email người dùng'
                        }]}>
                        <Input label="Nhập email" />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Chưa có mật khẩu người dùng' }]}>
                        <Input.Password label="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        name="passwordConfirm"
                        label="xác nhận mật khẩu"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Nhập xác nhận mật khẩu',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('mật khẩu không khớp nhau'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
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
                            <Select.Option value={"admin"}>admin</Select.Option>
                            <Select.Option value={"user"}>user</Select.Option>
                            <Select.Option value={"staff"}>staff</Select.Option>
                            <Select.Option value={"teacher"}>teacher</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"avatar"} rules={[{ required: true, message: 'Chưa có hình' }]}>
                        <Space size={'large'}>
                            <Input type="file" style={{ width: '360' }} onChange={(e) => setImageHere(e.target.files[0])} />
                            <Button onClick={uploadImage} disabled={uploading}> {uploading ? "Uploading..." : "Upload Image"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal