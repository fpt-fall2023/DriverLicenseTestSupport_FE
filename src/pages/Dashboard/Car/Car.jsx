 import { Button, Col, Modal, Popconfirm, Row, Space, Table, notification, Layout, Tag } from "antd"
 import Sidebar from "../../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getCar, deleteCar } from "../../../apis/CarService"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AddModal from "./Modal/AddModal"
import EditModal from "./Modal/EditModal"

const Car = () => {
     const [car, setCar] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [carData, setCarData] = useState()

    const columns = [
        {
            title: "Xe",
            dataIndex: "name",
        },
        {
            title: "Hãng",
            dataIndex: "brand",
        },
        {
            title: "Bảng số",
            dataIndex: "licensePlate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (record) => {       
                    let color;
                    if (record === 'broken') {
                      color = 'volcano';
                    }
                    else if(record === 'fixing'){
                        color = 'geekblue';
                    }
                    else if(record === 'available'){
                        color = 'green';
                    }
                    else{
                        color = 'gray';
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

    const getCars = () => {
        setLoading(true)
        getCar().then((res) => {
            setCar(res.data.data.Car)
            setLoading(false)
            console.log(res.data.data.Car)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const onEditcourse = (record) => {
        setCarData(record)
        setIsEditing(true)
    }

    const onDelete = (carID) => {

        Modal.confirm({
            title: "Bạn muốn xóa xe này ?",
            okText: "Delete",
            okType: "danger",
            onOk: () => {          
                    setLoading(true);
                    deleteCar(carID._id).then(res => {
                        console.log(res);
                        setLoading(false);
                        getCars();
                        notification.success({
                            message: "xóa thành công"
                        })
                    }).catch(err => {
                        console.log(err)
                    });
                    console.log(carID)
            }
        });

    }

    useEffect(() => {
        getCars()
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
                        <Button type="primary" onClick={() => setIsAdding(true)}>Thêm Xe Mới</Button>
                    </Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={car} />
                    <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getCourse={getCars} />
                    <EditModal isEditing={isEditing} setIsEditing={setIsEditing} carData={carData} getCar={getCars} />
                    </Layout>
                </Col>
            </Row>
        </div>
    )
 }

export default Car