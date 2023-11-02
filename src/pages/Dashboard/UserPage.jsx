import styles from "./UserPage.module.css"
import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Table, Input, notification, Layout } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllUsers, deleteUser, updateUser } from "../../apis/AdminService";
import Sidebar from '../../components/sidebar/Sidebar';
import { Col, Row } from 'antd';
import Modal from "antd/es/modal/Modal";
import { Link } from "react-router-dom";
import AddModal from "./AddUserPage";

const UserPage = () => {
    const avt = "https://firebasestorage.googleapis.com/v0/b/uploadphotodrivingtest.appspot.com/o/images%2Fillustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg-85e1a191-e29b-4607-b0d9-81d6d99d24a3?alt=media&token=4cacd7e3-73e1-4706-b1e8-3b50c8f0669e";
    const [dataSrc, setDataSrc] = useState([]);
    const [loading, setLoading] = useState([]);
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState([]);


    const [form] = Form.useForm()
    const mainLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        size: "large"
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (avatar) => {
                if(avatar == "" ||avatar == null ){
                    avatar = pic;
                }
                return(
                    <img src={avatar} alt="avatar" style={{ width: '70px', height: '70px' }} />
                )
            }
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        // {
        //     title: 'sinh nhật',
        //     dataIndex: 'birthdate',
        // },
        {
            title: 'Vai trò',
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
                        oneEditUser(record);
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


    const oneEditUser = (record) => {
        setIsEditing(true);
        setEditUser(record);
    };

    const onDelete = (record) => {
        console.log(record.role)
        Modal.confirm({
            title: "Bạn muốn xóa người dùng này ?",
            okText: "Delete",
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
                } else {
                    notification.error({
                        message: "không thể xóa admin"
                    })
                }

            }
        });
    };

    const isLeastAdmin = () => {
        const result = dataSrc?.filter(item => item.role === 'admin');
        if (result && result.length > 1) {
            return false;
        }
        return true;
    }

    const onFinish = (values) => {

        const userID = values._id
        const userName = values.name
        const role = values.role
        // const birthdate = values.birthdate
        // const avatar = values.avatar
        console.log(userID, userName, role)
        if (isLeastAdmin() === false) {
            updateUser(userID, userName, role).then(res => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    setIsEditing(false)
                    getUser()
                    notification.success({
                        message: "Chỉnh sửa thành công"
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            notification.error({
                message: "không thể edit role admin"
            })
        }

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
                <Col flex="auto">
                    <Layout
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "100%",

                        }}
                    >
                        {/* <Space style={{ padding: 16 }}><Button type="primary" onClick={() => setIsAdding(true)}>Thêm người dùng mới</Button></Space> */}
                        <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSrc} />
                        <Modal
                            title="Chỉnh sửa user"
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
                                initialValues={form.setFieldsValue(editUser)}
                            >
                                <Form.Item name="_id" hidden={true} />
                                <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Chưa có tên người dùng' }]}>
                                    <Input label="Nhập tên" />
                                </Form.Item>
                                {/* <div className={styles.editBoxTitle}>Đáp Án</div> */}
                                <Form.Item name={"role"} label="vai trò"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'chưa chọn loại vai trò',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn loại vai trò"
                                    >
                                        <Select.Option value={"admin"}>admin</Select.Option>
                                        <Select.Option value={"user"}>user</Select.Option>
                                        <Select.Option value={"staff"}>staff</Select.Option>
                                        <Select.Option value={"teacher"}>teacher</Select.Option>
                                    </Select>
                                </Form.Item>

                            </Form>
                        </Modal>
                        {/* <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getQuestionCategory={getUser} /> */}
                    </Layout>
                </Col>
            </Row>
        </div>

    );
}
export default UserPage;