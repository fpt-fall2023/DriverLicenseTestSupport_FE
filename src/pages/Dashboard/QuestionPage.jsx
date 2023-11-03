import styles from './QuestionPage.module.css';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Select,
  Space,
  Table,
  Input,
  notification,
  Layout,
  Radio,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  getQuestions,
  deleteQuestion,
  updateQuestion,
} from '../../apis/QuestionService';
import Sidebar from '../../components/sidebar/Sidebar';
import { Col, Row } from 'antd';

import Modal from 'antd/es/modal/Modal';
import TextArea from 'antd/es/input/TextArea';
import AddModal from './AddQuestionPage';

// import { storage } from "../../components/upload_img/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

const QuestionPage = () => {

  const pic =
    'https://firebasestorage.googleapis.com/v0/b/uploadphotodrivingtest.appspot.com/o/images%2Fistockphoto-1441026821-612x612.jpg-d7b0f540-763b-4e30-9aea-3bd16e7d0ee2?alt=media&token=b6a2c70a-8c06-4e59-b596-189dfcb0d1e3';
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
    // const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store the uploaded image URL
    // const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();
    const mainLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 28 },
    size: 'large',
  };


    const columns = [
        {
            title: 'hình ảnh',
            dataIndex: 'questionImage',
            render: (questionImage) => {
        if (questionImage == '' || questionImage == null) {
                    questionImage = pic;
                }
        return (
          <img
            src={questionImage}
            alt="questionImage"
            style={{ width: '70px', height: '70px' }}
          />
        );
      },
        },
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
          <EditOutlined
            onClick={() => {
                        form.resetFields();
                        onEditQuestion(record);
                    }}
            style={{ color: 'blue' }}
          />
          <DeleteOutlined
            onClick={() => {
                        onDelete(record);
                    }}
            style={{ color: 'red', marginLeft: 12 }}
          />
                </Space>
            ),
        },
  ];


    const onEditQuestion = (record) => {
        setIsEditing(true);
    console.log(record);
        setEditQuestion(record);
    };


    const onDelete = (record) => {
        Modal.confirm({
      title: 'bạn có muốn xóa câu hỏi này',
      okText: 'Xóa',
      okType: 'danger',
            onOk: () => {
                setLoading(true);
        deleteQuestion(record._id)
          .then((res) => {
                    console.log(res);
                    setLoading(false);
                    getQuestion();
                    notification.success({
              message: 'xóa thành công',
            });
                    })
          .catch((err) => {
            console.log(err);
                });
      },
        });
    };


    // const uploadImage = (questionImage) => {
    //     if(questionImage == null) return;
    //     const imageRef = ref(storage, `images/${questionImage}-${v4()}`); // link trong folder trong firebase 
    //     setUploading(true)
    //     uploadBytes(imageRef, questionImage)
    //         .then(() => {
    //             setUploading(false)
    //             getDownloadURL(imageRef).then((url) => {
    //                 setUploadedImageUrl(url); // Store the uploaded image URL
    //                 console.log(url)
    //             });
    //         })
    //         .catch((error) => {
    //             console.error("Error uploading image: ", error);
    //             setUploading(false)
    //         });
    // };

    const onFinish = (values) => {
    const questionId = values._id;
    const questionName = values.questionName;
    const answers = values.answers;
        // const questionImage = uploadedImageUrl
    console.log(questionId, questionName, answers);
        // console.log(values.questionImage.replace(/^.*[\\\/]/, ''))
        // uploadImage(values.questionImage.replace(/^.*[\\\/]/, ''))
    updateQuestion(questionId, questionName, answers)
      .then((res) => {
            if (res.status === 200) {
          console.log(res.data.data);
          setIsEditing(false);
          getQuestion();
            }
        })
      .catch((err) => {
        console.log(err);
      });
  };

    useEffect(() => {
        getQuestion();
    }, []);


    const getQuestion = () => {
        setLoading(true);
    getQuestions()
      .then((res) => {
            if (res.status === 200) {
          console.log(res.data.data.Question);
          setDataSrc(res.data.data);
                setLoading(false);
            }
        })
      .catch((err) => {
        console.log(err);
      });
  };

    return (
        <div>
            <Row>
        <Col flex="100px">
          <Sidebar />
        </Col>
                <Col flex="auto">
                    <Layout
                        style={{
                            padding: 24,
                            margin: 0,
              minHeight: '100%',
                        }}
                    >
            <div style={{ maxWidth: '1555px' }}>
              <Space style={{ padding: 16 }}>
                <Button type="primary" onClick={() => setIsAdding(true)}>
                  Thêm câu hỏi mới
                </Button>
              </Space>
              <Table
                loading={loading}
                                pagination={{ pageSize: 8 }}
                                columns={columns}
                dataSource={dataSrc.Question}
              />
                            <Modal
                                width={600}
                                open={isEditing}
                                okText="Save"
                                onCancel={() => {
                                    setIsEditing(false);
                                }}
                                onOk={() => {
                  form.submit();
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
                                    {/* <Form.Item name="questionImage" rules={[{ required: true, message: 'Chưa có hình' }]}>
                                        <Input type="file" />
                                    </Form.Item> */}
                                    <div className={styles.editBoxTitle}>Đáp Án</div>
                  <Form.List name="answers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: 'flex', marginBottom: 8 }}
                            align="center"
                          >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'answerName']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Chưa có câu trả lời',
                                },
                              ]}
                                        >
                                            <Input.TextArea
                                                placeholder="Nhập câu trả lời"
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                style={{ width: '360px' }}
                              />
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
                              <Radio.Group>
                                <Radio value={true}>câu đúng </Radio>
                                                <Radio value={false}>câu sai </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <MinusCircleOutlined
                              style={{ marginBottom: '25px' }}
                              onClick={() => remove(name)}
                            />
                                    </Space>
                                ))}
                                <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                                        Thêm câu trả lời
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>    
                                </Form>
                            </Modal>
              <AddModal
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                getQuestion={getQuestion}
              />
                        </div>
                    </Layout>
                </Col>
            </Row>
        </div>
    );
};
export default QuestionPage;

