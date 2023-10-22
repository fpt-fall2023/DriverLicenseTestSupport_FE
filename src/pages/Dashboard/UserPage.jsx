import styles from "./UserPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Table, Input, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllUsers, deleteUser } from "../../apis/AdminService";
import Sidebar from '../../components/sidebar/sidebar';
import { Col, Row } from 'antd';
import Modal from "antd/es/modal/Modal";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const UserPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);
    // const [editQuestion, setEditQuestion] = useState([]);


    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const columns = [
        {
            title: 'Avatar',
            avatar: '_id',

        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
        },
        {
            title: 'Vai trỏ',
            dataIndex: 'role',
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {
                        form.resetFields();
                        // onEditQuestion(record);
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


    // const onEditQuestion = (record) => {
    //     setIsEditing(true);
    //     console.log(record)
    //     setEditQuestion(record);
    // };

    const onDelete = (record) => {
        console.log(record.role)
        Modal.confirm({
            title: "Are you sure, you want to delete this question?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                if (record.role != "admin") {
                    setLoading(true);
                    deleteUser(record._id).then(res => {
                        console.log(res);
                        setLoading(false);
                        getUser();
                        notification.success({
                            message: "xóa thành công"
                        })
                    }).catch(err => {
                        console.log(err)
                    });
                }else{
                    notification.error({
                        message: "không thể xóa admin"
                    })
                }

            }
        });
    };

    const onFinish = (values) => {
        // const questionId = values._id
        // const questionName = values.questionName
        // const answers = values.answers
        // console.log(questionId, questionName, answers)
        // updateQuestion(questionId, questionName, answers).then(res => {
        //     if (res.status === 200) {
        //         console.log(res.data.data)
        //         setIsEditing(false)
        //         getQuestion()
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
        console.log(values);
    }


    useEffect(() => {
        getUser();
    }, []);


    const getUser = () => {
        setLoading(true);
        getAllUsers().then((res) => {
            if (res.status === 200) {
                console.log(res.data.data)
                setDataSrc(res.data.data.User)
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
                <Col flex="auto"><div >
                    <Space style={{ padding: 16 }}><Button type="primary"><Link to='/dashboard/AddQuestionPage'>Add new question</Link></Button></Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSrc} />
                    {/* <Modal
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
                            <Form.Item name="_id" hidden={true}/>
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
                    </Modal> */}
                </div></Col>
            </Row>
        </div>

    );
}
export default UserPage;