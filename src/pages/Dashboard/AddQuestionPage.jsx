import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Space, notification  } from 'antd';
import { addQuestion } from '../../apis/QuestionService';
import { CATEGORY_API_URL } from "../../apis/APIConfig";
import styles from "./AddQuestionPage.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        addQuestion(values.questionName, values.answers, values.category).then(res => {
            if (res.status === 200) {
                console.log(res)
                notification.success({
                    message: "thêm câu hỏi thành công"
                })  
                navigate("/Dashboard/QuestionPage")
            }
            
        }).catch(err => {
            console.log(err)
        })

    };


    const GetAllCategory = () => {
        axios.get(CATEGORY_API_URL, { headers: { Authorization: `Bearer ${token}` } })
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

    return (
        <div className={styles.main}>
        <div className={styles.AddBlock}>
        <div>
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: 700 }}
            autoComplete="off"
            initialValues={{
                answers:[
                    {isCorrect : true}
                ]
            }}

        >
            <Form.Item name={"questionName"} label="Nội dung câu hỏi" rules={[{ required: true, message: 'Chưa có câu hỏi' }]}>
                <Input.TextArea 
                placeholder='Nhập câu hỏi'
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
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
                                     style={{width:'360px'}}/>
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
                                style={{marginBottom:"25px"}}
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm câu hỏi
                </Button>
            </Form.Item>
        </Form>
        </div>
        </div>
        </div>
    );
};

export default AddQuestionPage;