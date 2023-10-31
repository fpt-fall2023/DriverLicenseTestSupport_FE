 import { Button, Col, Modal, Popconfirm, Row, Space, Table, notification, Layout } from "antd"
 import Sidebar from "../../../components/sidebar/sidebar"
import { useEffect, useState } from "react"
import { deleteCourse, getCourse } from "../../../apis/CourseService"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AddModal from "./Modal/AddModal"
 import EditModal from "./Modal/EditModal"

const Course = () => {
     const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [courseData, setCourseData] = useState()

    const columns = [
        {
            title: "Khóa học",
            dataIndex: "courseName",
        },
        {
            title: "mô tả",
            dataIndex: "description",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {
                        onEditcourse(record);
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

    const getCourses = () => {
        setLoading(true)
        getCourse().then((res) => {
            setCourse(res.data.data.Course)
            setLoading(false)
            console.log(res.data.data.Course)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const onEditcourse = (record) => {
        console.log(record)
        setCourseData(record)
        setIsEditing(true)
    }

    const onDelete = (courseID) => {

        Modal.confirm({
            title: "Bạn muốn xóa course này ?",
            okText: "Delete",
            okType: "danger",
            onOk: () => {          
                    setLoading(true);
                    deleteCourse(courseID._id).then(res => {
                        console.log(res);
                        setLoading(false);
                        getCourses();
                        notification.success({
                            message: "xóa thành công"
                        })
                    }).catch(err => {
                        console.log(err)
                    });
                    console.log(courseID)
            }
        });

    }

    useEffect(() => {
        getCourses()
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
                    <Space style={{ padding: 16 }}>
                        <Button type="primary" onClick={() => setIsAdding(true)}>Thêm Khóa Học Mới</Button>
                    </Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={course} />
                    <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getCourse={getCourses} />
                    <EditModal isEditing={isEditing} setIsEditing={setIsEditing} courseData={courseData} getCourse={getCourses} />
                    </Layout>
                </Col>
            </Row>
        </div>
    )
 }

export default Course