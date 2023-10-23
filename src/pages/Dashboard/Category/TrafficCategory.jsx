import { Button, Col, Popconfirm, Row, Space, Table, notification } from "antd"
import Sidebar from "../../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import { deleteTrafficCategory, getTrafficCategory } from "../../../apis/TrafficSignService"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AddModal from "./TrafficCategoryModal/AddModal"
import EditModal from "./TrafficCategoryModal/EditModal"
const TrafficCategory = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [categoryData, setCategoryData] = useState()
    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "trafficType",
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {
                        onEditCategory(record);
                    }}
                        style={{ color: "blue" }} />
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc là muốn xóa danh mục này?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDelete(record._id)}
                    >
                        <div>
                            <DeleteOutlined style={{ color: "red", marginLeft: 12, cursor: "pointer" }} />
                        </div>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const getTrafficCategories = () => {
        setLoading(true)
        getTrafficCategory().then((res) => {
            setCategories(res.data.data.TrafficType)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const onEditCategory = (record) => {
        setCategoryData(record)
        setIsEditing(true)
    }

    const onDelete = (categoryId) => {
        deleteTrafficCategory(categoryId).then((res) => {
            if (res.status === 204) {
                notification.success({
                    message: "Xóa thành công",
                });
                getTrafficCategories();
            }
        })
    }

    useEffect(() => {
        getTrafficCategories();
    }, []);

    return (
        <div>
            <Row>
                <Col flex="100px"><Sidebar /></Col>
                <Col flex="auto">
                    <Space style={{ padding: 16 }}>
                        <Button type="primary" onClick={() => setIsAdding(true)}>Thêm Danh Mục Mới</Button>
                    </Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={categories} />
                    <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getTrafficCategories={getTrafficCategories} />
                    <EditModal isEditing={isEditing} setIsEditing={setIsEditing} categoryData={categoryData} getTrafficCategories={getTrafficCategories} />
                </Col>
            </Row>
        </div>
    )
}

export default TrafficCategory