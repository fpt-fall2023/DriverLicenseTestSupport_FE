
import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Space } from 'antd';
import { addQuestion } from '../../apis/QuestionService';
import { CATEGORY_API_URL } from "../../apis/APIConfig";
import axios from 'axios';

const AddQuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFkOTFkNWRiNDFmMTEyMGM0ZmI3ZTMiLCJpYXQiOjE2OTc2MDM5MDQsImV4cCI6MTcwNTM3OTkwNH0.0mdxc18kBAW7B5d77tVlJoQUvr3CPXsh50gXE7IkT9E"

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        addQuestion(values.questionName, values.answers, values.category).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    };

    
    const GetAllCategory = () => {
        axios.get(CATEGORY_API_URL, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data.QuestionType)
                    setDataSrc(res.data.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        GetAllCategory();
    }, []);

    return (
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
                                    <Radio.Group value={false}>
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
                    // showSearch
                    placeholder="Search to Select"
                    options={dataSrc.map((category) => ({
                        value: category._id,
                        label: item.questionType,
                      }))}
                />

            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm câu hỏi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddQuestionPage;