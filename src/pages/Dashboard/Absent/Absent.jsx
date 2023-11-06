import { Button, Col, Modal, Row, Space, Table, notification, Layout, Tag } from "antd"
import Sidebar from "../../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getAllAbsent, approveAbsent, rejectAbsent } from "../../../apis/AbsentService"
// import AddModal from "./Modal/AddModal"
// import EditModal from "./Modal/EditModal"

const Absent = () => {
    const [absent, setAbsent] = useState([])
    const [loading, setLoading] = useState(true)
    const columns = [
        {
            title: "Avatar",
            dataIndex: ['teacher', 'avatar'],
            render: (avatar) => {
                if (avatar == "" || avatar == null) {
                    avatar = pic;
                }
                return (
                    <img src={avatar} alt="avatar" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                )
            }
        },
        {
            title: "Giáo viên",
            dataIndex: ['teacher', 'name'],
        },

        {
            title: "Lí do",
            dataIndex: "reason",
        },
        {
            title: "ngày vắng",
            dataIndex: "dateAbsent",
        },
        {
            title: "trạng thái",
            dataIndex: "status",
            render: (record) => {
                let color;
                if (record === 'rejected') {
                    color = 'red';
                }
                else if (record === 'pending') {
                    color = 'geekblue';
                }
                else if (record === 'approved') {
                    color = 'green';
                }

                return (
                    <Tag color={color}>
                        {record.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'center',
            render: (record) => (
                // if status is pending, will show 2 buttons else hide 2 buttons
                <Space size="middle">
                    {record.status === "pending" ? (<>
                        <Button onClick={() => {
                            Approve(record);
                        }}
                            style={{ color: "green"}} >Approve</Button>
                        <Button onClick={() => {
                            Reject(record);
                        }}
                            style={{ color: "red" }}  >Reject</Button>
                    </>) : (
                        <>

                        </>
                    )}
                </Space>
            ),
        },
    ]

    const getAllAbsents = () => {
        setLoading(true)
        getAllAbsent().then((res) => {
            console.log(res.data.data.Absent)
            setAbsent(res.data.data.Absent)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }


    const Approve = (record) => {
        Modal.confirm({
            title: 'bạn có chắc chắn approve ?',
            okText: 'Thay đổi',
            okType: 'danger',
            onOk: () => {
                setLoading(true);
                approveAbsent(record._id)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        getAllAbsents();
                        notification.success({
                            message: 'thay đổi thành công',
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        });
    };

    const Reject = (record) => {
        Modal.confirm({
            title: 'bạn có chắc chắn reject ?',
            okText: 'Thay đổi',
            okType: 'danger',
            onOk: () => {
                setLoading(true);
                rejectAbsent(record._id)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        getAllAbsents();
                        notification.success({
                            message: 'thay đổi thành công',
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        });
    };

    useEffect(() => {
        getAllAbsents()
    }, []);

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
                        <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={absent} />
                    </Layout>
                </Col>
            </Row>
        </div>
    )
}

export default Absent