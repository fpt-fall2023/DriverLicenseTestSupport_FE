import styles from "./QuestionPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getQuestions } from "../../apis/QuestionService";
 import { QUESTION_API_URL } from "../../apis/APIConfig";
import Sidebar from '../../components/sidebar/sidebar';
import axios from "axios";
import { Col, Row } from 'antd';
import Modal from "antd/es/modal/Modal";

const QuestionPage = () => {
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);

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
                    <EditOutlined style={{ color: "blue" }} />
                    <DeleteOutlined  onClick={() => {
                    onDelete(record);
                  }}
                  style={{ color: "red", marginLeft: 12 }} />
                </Space>
            ),
        },
    ]
    
    const onDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this question?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setLoading(true);
                axios.delete(QUESTION_API_URL+ "/" + record._id).then(res => {
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
                    <Space style={{padding: 16}}><Button type="primary">Add new question</Button></Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSrc.Question} />
                </div></Col>
            </Row>
        </div>

    );
}
export default QuestionPage;