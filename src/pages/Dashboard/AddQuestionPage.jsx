
import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Space } from 'antd';
import { addQuestion } from '../../apis/QuestionService';
import { CATEGORY_API_URL } from "../../apis/APIConfig";
import styles from "./AddQuestionPage.module.css"
import axios from 'axios';

const AddQuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const [data, setData] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFkOTFkNWRiNDFmMTEyMGM0ZmI3ZTMiLCJpYXQiOjE2OTc2MTQwMjgsImV4cCI6MTcwNTM5MDAyOH0.UYl7u1yXvULAALdEjLksjxtSNagtI1XhHK6F3hh5Gho"

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        addQuestion(values.questionName, values.answers, values.category).then(res => {
            console.log(res)
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
        <div>
        <div className={styles.container}>
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
        >
            <Form.Item name={"questionName"} label="Nội dung câu hỏi" required>
                <Input placeholder='Nhập câu hỏi' />
            </Form.Item>
            <Form.List name="answers">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'answerName']}
                                    rules={[{ required: true, message: 'Chưa có câu trả lời' }]}
                                >
                                    <Input placeholder="Nhập câu trả lời" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'isCorrect']}
                                >
                                    <Radio.Group defaultValue={false}>
                                        <Radio value={true} >câu đúng </Radio>
                                        <Radio value={false}>câu sai </Radio>
                                    </Radio.Group>

                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
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
            <Form.Item name={"category"} label="Nội dung câu hỏi" required>
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
    );
};

export default AddQuestionPage;