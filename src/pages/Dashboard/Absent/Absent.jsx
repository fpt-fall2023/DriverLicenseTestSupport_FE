import { Button, Col, Modal, Popconfirm, Row, Space, Table, notification, Layout, Tag } from "antd"
import Sidebar from "../../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getAllAbsent, approveAbsent,rejectAbsent } from "../../../apis/AbsentService"
import { CloseSquareOutlined, CheckOutlined } from "@ant-design/icons"
// import AddModal from "./Modal/AddModal"
// import EditModal from "./Modal/EditModal"

const Absent = () => {
        const [absent, setAbsent] = useState([])
       const [loading, setLoading] = useState(false)
    //    const [isEditing, setIsEditing] = useState(false)
    //    const [isAdding, setIsAdding] = useState(false)
    //    const [courseData, setCourseData] = useState()

    const columns = [
        {
            title: "Avatar",
            dataIndex: ['teacher', 'avatar'],
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
                  color = 'gray';
                }
                else if(record === 'pending'){
                    color = 'geekblue';
                }
                else if(record === 'approved'){
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
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <CheckOutlined  onClick={() => {
                        Approve(record);
                    }}
                        style={{ color: "blue" }} />
                    <CloseSquareOutlined onClick={() => {
                         Reject(record);
                    }}
                        style={{ color: "red", marginLeft: 12 }} />
                </Space>
            ),
        },
    ]

       const getAllAbsents = () => {
           setLoading(true)
           getAllAbsent().then((res) => {
               setAbsent(res.data.data.Absent)
               setLoading(false)
               console.log(res.data.data.Absent)
           }).catch((err) => {
               console.log(err)
               setLoading(false)
           })
       }
       const Approve = (record) => {
        approveAbsent(record._id).then(res => {
            console.log(res);
            setLoading(false);
            getAllAbsents();
        })
       }
       const Reject = (record) => {
        rejectAbsent(record._id).then(res => {
            console.log(res);
            setLoading(false);
            getAllAbsents();
        })
       }
    //    const onDelete = (courseID) => {

    //        Modal.confirm({
    //            title: "Bạn muốn xóa course này ?",
    //            okText: "Delete",
    //            okType: "danger",
    //            onOk: () => {          
    //                    setLoading(true);
    //                    deleteCourse(courseID._id).then(res => {
    //                        console.log(res);
    //                        setLoading(false);
    //                        getCourses();
    //                        notification.success({
    //                            message: "xóa thành công"
    //                        })
    //                    }).catch(err => {
    //                        console.log(err)
    //                    });
    //                    console.log(courseID)
    //            }
    //        });

    //    }

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
                       {/* <Space style={{ padding: 16 }}>
                           <Button type="primary" onClick={() => setIsAdding(true)}>Thêm Khóa Học Mới</Button>
                       </Space> */}
                       <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={absent} />
                       {/* <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getCourse={getCourses} />
                       <EditModal isEditing={isEditing} setIsEditing={setIsEditing} courseData={courseData} getCourse={getCourses} /> */}
                       </Layout>
                   </Col>
               </Row>
           </div>
       )
}

export default Absent