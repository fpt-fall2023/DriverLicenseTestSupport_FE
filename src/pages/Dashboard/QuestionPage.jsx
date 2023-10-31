import styles from "./QuestionPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Table, Input, notification, Layout } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getQuestions, deleteQuestion, updateQuestion } from "../../apis/QuestionService";
import Sidebar from '../../components/sidebar/sidebar';
import { Col, Row } from 'antd';
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import AddModal from "./AddQuestionPage";

const QuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState([]);
    const [isAdding, setIsAdding] = useState(false)

    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: '_id',

        // },
        {
            title: 'Nội dung câu hỏi',
            dataIndex: 'questionName',
        },
        // {
        //     title: 'Chi tiết nội dung',
        //     render: () => <a>Delete</a>,
        // },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {
                        form.resetFields();
                        onEditQuestion(record);
                    }}
                        style={{ color: "blue" }} />
                    <DeleteOutlined onClick={() => {
                        onDelete(record);
                    }}
                        style={{ color: "red", marginLeft: 12 }} />
                </Space>
            ),
        },
    ]


    const onEditQuestion = (record) => {
        setIsEditing(true);
        console.log(record)
        setEditQuestion(record);
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: "bạn có muốn xóa câu hỏi này",
            okText: "Xóa",
            okType: "danger",
            onOk: () => {
                setLoading(true);
                deleteQuestion(record._id).then(res => {
                    console.log(res);
                    setLoading(false);
                    getQuestion();
                    notification.success("xóa thành công")
                }).catch(err => {
                    console.log(err)
                });
            }
        });
    };

    const onFinish = (values) => {
        const questionId = values._id
        const questionName = values.questionName
        const answers = values.answers
        console.log(questionId, questionName, answers)
        updateQuestion(questionId, questionName, answers).then(res => {
            if (res.status === 200) {
                console.log(res.data.data)
                setIsEditing(false)
                getQuestion()
            }
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        getQuestion();
    }, []);


    const getQuestion = () => {
        setLoading(true);
        getQuestions().then((res) => {
            if (res.status === 200) {
                console.log(res.data.data.Question)
                setDataSrc(res.data.data)
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (

        <div>
            <Row>
                <Col flex="100px"><Sidebar /></Col>
                <Col flex="auto">
                    <Layout
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: "100%",
                        
                      }}
                    >
                        <div style={{ maxWidth: "1200px" }} >

                        <Space style={{ padding: 16 }}><Button type="primary" onClick={() => setIsAdding(true)}>Thêm câu hỏi mới</Button></Space>
                            <Table loading={loading}
                             pagination={{ pageSize: 8 }}
                             columns={columns} 
                             dataSource={dataSrc.Question} />
                            <Modal
                                open={isEditing}
                                okText="Save"
                                onCancel={() => {
                                    setIsEditing(false);
                                }}
                                onOk={() => {
                                    form.submit()
                                }}
                            >
                                <Form
                                    {...mainLayout}
                                    form={form}
                                    onFinish={onFinish}
                                    initialValues={form.setFieldsValue(editQuestion)}
                                >
                                    <div className={styles.editBoxTitle}>Câu Hỏi</div>
                                    <Form.Item name="_id" hidden={true} />
                                    <Form.Item name="questionName">
                                        <TextArea />
                                    </Form.Item>
                                    <div className={styles.editBoxTitle}>Đáp Án</div>
                                    <Form.List name="answers">
                                        {(fields) => (
                                            <>
                                                {fields.map(field => (
                                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'answerName']}
                                                            style={{ width: "20rem" }}
                                                        >
                                                            <TextArea />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'isCorrect']}
                                                        >
                                                            <Select style={{ width: "5.5rem" }}>
                                                                <Select.Option value={true}>Đúng</Select.Option>
                                                                <Select.Option value={false}>Sai</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Space>
                                                ))}
                                            </>
                                        )}
                                    </Form.List>
                                </Form>
                            </Modal>
                            <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getQuestion={getQuestion} />
                        </div>
                    </Layout>
                </Col>
            </Row>
        </div>

    );
}
export default QuestionPage;