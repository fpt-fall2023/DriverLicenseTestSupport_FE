import { Button, Col, Popconfirm, Row, Space, Table, notification } from "antd"
import Sidebar from "../../../components/sidebar/sidebar"
import { useEffect, useState } from "react"
import { deleteCategory, getCategory } from "../../../apis/QuestionService"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AddModal from "./Modal/AddModal"
import EditModal from "./Modal/EditModal"

const Category = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [categoryData, setCategoryData] = useState()

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "questionType",
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

    const getQuestionCategory = () => {
        setLoading(true)
        getCategory().then((res) => {
            setCategories(res.data.data.QuestionType)
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
        deleteCategory(categoryId).then((res) => {
            if (res.status === 204) {
                notification.success({
                    message: "Xóa thành công",
                });
                getQuestionCategory();
            }
        })
    }

    useEffect(() => {
        getQuestionCategory();
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
                    <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getQuestionCategory={getQuestionCategory} />
                    <EditModal isEditing={isEditing} setIsEditing={setIsEditing} categoryData={categoryData} getQuestionCategory={getQuestionCategory} />
                </Col>
            </Row>
        </div>
    )
}

export default Category