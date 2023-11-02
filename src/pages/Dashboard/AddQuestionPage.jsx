import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Space, notification, Modal, message } from 'antd';
import { addQuestion, getCategory } from '../../apis/QuestionService';
import { storage } from "../../components/upload_img/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddModal = ({ isAdding, setIsAdding, getQuestion }) => {

    const mainLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 28 },
        size: "large"
    }

    const [form] = Form.useForm()
    const [dataSrc, setDataSrc] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store the uploaded image URL
    const [uploading, setUploading] = useState(false);
    const [imageHere, setImageHere] = useState(null);


    const GetAllCategory = async () => {
        getCategory()
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data.QuestionType)
                    setDataSrc(res.data.data.QuestionType)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        GetAllCategory();
    }, []);

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


    const onFinish = (values) => {
        form.resetFields()
        console.log(imageHere)
            addQuestion(values.questionName, values.answers, values.category , uploadedImageUrl ).then(res => {
                if (res.status === 200) {
                    console.log(res)
                    notification.success({
                        message: "thêm câu hỏi thành công"
                    })
                    getQuestion()
                    setIsAdding(false)

                } else if(uploadedImageUrl == null) {
                    notification.error({
                        message: "thêm ảnh thất bại"
                    })
                }
                else{
                    notification.error({
                        message: "thêm câu hỏi thất bại"
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Modal
                title="Thêm câu hỏi"
                open={isAdding}
                okText="Thêm"
                onCancel={() => { setIsAdding(false) }}
                onOk={() => {
                    form.submit();
                }}
                width={600}
            >
                <Form
                    form={form}
                    {...mainLayout}
                    onFinish={onFinish}

                    name="dynamic_form_nest_item"
                    autoComplete="off"
                    initialValues={{
                        answers: [
                            { isCorrect: true }
                        ],

                    }}
                >
                    <Form.Item name={"questionName"} label="Nội dung câu hỏi" rules={[{ required: true, message: 'Chưa có câu hỏi' }]}>
                        <Input.TextArea
                            placeholder='Nhập câu hỏi'
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item name={"questionImage"} rules={[{ required: true, message: 'Chưa có hình' }]}>
                        <Space size={'large'}>
                            <Input type="file" style={{width :'360'}} onChange={(e) => setImageHere(e.target.files[0])} />
                            <Button onClick={uploadImage} disabled={uploading}> {uploading ? "Uploading..." : "Upload Image"}</Button>
                        </Space>
                    </Form.Item>
                    <Form.List name="answers"
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'answerName']}
                                            rules={[{ required: true, message: 'Chưa có câu trả lời' }]}
                                        >
                                            <Input.TextArea
                                                placeholder="Nhập câu trả lời"
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                                style={{ width: '360px' }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'isCorrect']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'chưa chọn',
                                                },
                                            ]}
                                        >
                                            <Radio.Group >
                                                <Radio value={true} >câu đúng </Radio>
                                                <Radio value={false}>câu sai </Radio>
                                            </Radio.Group>

                                        </Form.Item>
                                        <MinusCircleOutlined
                                            style={{ marginBottom: "25px" }}
                                            onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm câu trả lời
                                    </Button>
                                </Form.Item>
                            </>
                        )}

                    </Form.List>
                    <Form.Item name={"category"} label="Nội dung câu hỏi"
                        rules={[
                            {
                                required: true,
                                message: 'chưa chọn loại câu hỏi',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn loại câu hỏi"
                        >
                            {dataSrc.map((item) => (
                                <Option key={item._id} value={item._id}>
                                    {item.questionType}
                                </Option>
                            ))}

                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AddModal