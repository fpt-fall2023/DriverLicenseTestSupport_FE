import { Button, Col, Modal, Popconfirm, Row, Space, Table, notification, Layout } from "antd"
import Sidebar from "../../../components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import { deleteSlot, getSlot } from "../../../apis/SlotService"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AddModal from "./Modal/AddModal"
import EditModal from "./Modal/EditModal"

const Slot = () => {
    const [slot, setSlot] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [slotData, setslotData] = useState()

    const columns = [
        {
            title: "Slot",
            dataIndex: "time",
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'right',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {
                        onEditSlot(record);
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

    const getSlots = () => {
        setLoading(true)
        getSlot().then((res) => {
            setSlot(res.data.data.slot)
            setLoading(false)
            console.log(res.data.data.slot)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const onEditSlot = (record) => {
        console.log(record)
        setslotData(record)
        setIsEditing(true)
    }

    const onDelete = (slotID) => {

        Modal.confirm({
            title: "Bạn muốn xóa slot này ?",
            okText: "Delete",
            okType: "danger",
            onOk: () => {          
                    setLoading(true);
                    deleteSlot(slotID._id).then(res => {
                        console.log(res);
                        setLoading(false);
                        getSlots();
                        notification.success({
                            message: "xóa thành công"
                        })
                    }).catch(err => {
                        console.log(err)
                    });
                    console.log(slotID)
            }
        });

    }

    useEffect(() => {
        getSlots()
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
                        <Button type="primary" onClick={() => setIsAdding(true)}>Thêm Slot Mới</Button>
                    </Space>
                    <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={slot} />
                    <AddModal isAdding={isAdding} setIsAdding={setIsAdding} getSlot={getSlots} />
                    <EditModal isEditing={isEditing} setIsEditing={setIsEditing} slotData={slotData} getSlot={getSlots} />
                    </Layout>
                </Col>
            </Row>
        </div>
    )
}

export default Slot