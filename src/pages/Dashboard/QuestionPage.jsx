import styles from "./QuestionPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getQuestions } from "../../apis/QuestionService";
import { QUESTION_API_URL } from "../../apis/APIConfig";
import Sidebar from '../../components/sidebar/sidebar';
import axios from "axios";
import { Col, Row } from 'antd';

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
   
        setDataSrc((pre) => {
          return pre.filter((Question) => Question._id !== record._id);
        });
    
  };

const QuestionPage = () => {

    const [dataSrc, setDataSrc] = useState([]);

    useEffect(() => {
        axios.get(QUESTION_API_URL)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data.Question)
                    setDataSrc(res.data.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    return (

        <div>
            <Row>
                <Col flex="100px"><Sidebar /></Col>
                <Col flex="auto"><div >
                    <Space style={{padding: 16}}><Button type="primary">Add new question</Button></Space>
                    <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSrc.Question} />
                </div></Col>
            </Row>
        </div>

    );
}
export default QuestionPage;