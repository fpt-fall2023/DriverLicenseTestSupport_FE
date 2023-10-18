import styles from "./QuestionPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getQuestions } from "../../apis/QuestionService";
import { QUESTION_API_URL } from "../../apis/APIConfig";
import Sidebar from '../../components/sidebar/sidebar';
import axios from "axios";
import { Col, Row } from 'antd';
import Modal from "antd/es/modal/Modal";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const QuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState([]);
    const [editQuestion2, setEditQuestion2] = useState([]);

    const answers = [
        {
            answer: 'Đáp án 1',
            isCorrect: true
        },
        {
            answer: 'Đáp án 2',
            isCorrect: false
        },
        {
            answer: 'Đáp án 3',
            isCorrect: false
        }

    ]

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
                        onEditStudent(record);
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


    const onEditStudent = (record) => {
        setIsEditing(true);
        console.log(record)
        setEditQuestion(record)
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditQuestion(null);
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this question?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setLoading(true);
                axios.delete(QUESTION_API_URL + "/" + record._id).then(res => {
                    console.log(res);
                    setLoading(false);
                    getData();
                }).catch(err => {
                    console.log(err)
                });

            }
        });
    };


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(editQuestion.length > 0){
            setEditQuestion2(editQuestion);
        }
    }, [editQuestion]);

    const getData = () => {
        setLoading(true);
        axios.get(QUESTION_API_URL)
            .then((res) => {
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
                <Col flex="auto"><div >
                    <Space style={{ padding: 16 }}><Button type="primary"><Link to='/dashboard/AddQuestionPage'>Add new question</Link></Button></Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSrc.Question} />
                    <Modal
                        open={isEditing}
                        title="Chỉnh sửa câu hỏi"
                        okText="Save"
                        onCancel={() => {
                            setIsEditing(false);
                        }}
                        onOk={() => {
                            setIsEditing(false);
                        }}
                    >
                        <TextArea  value={editQuestion?.questionName} />
                        <TextArea  value={editQuestion2} />
                    </Modal>
                </div></Col>
            </Row>
        </div>

    );
}
export default QuestionPage;