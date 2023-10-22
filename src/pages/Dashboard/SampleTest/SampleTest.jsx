import { Button, Col, Popconfirm, Row, Space, Table, notification } from "antd"
import Sidebar from "../../../components/sidebar/sidebar"
import { useEffect, useState } from "react";
import { deleteSampleTest, getSampleTest } from "../../../apis/SampleTestService";
import { getQuestionBank } from "../../../apis/QuestionService";
import AddModal from "./Modal/AddModal";

const SampleTest = () => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [sampleTest, setSampleTest] = useState([])
    const [questionBank, setQuestionBank] = useState([])

    const columns = [
        {
            title: 'Đề',
            dataIndex: 'testName'
        },
        {
            title: 'Ngân hàng đề',
            render: (text, record) => (
                <div>{findQuestionBankNameById(record.questionBank)}</div>
            )
        },
        {
            title: 'Tác Vụ',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc là muốn xóa danh mục này?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => { handleDelete(record) }}
                    >
                        <div>
                            <Button type="primary" danger>Xóa</Button>
                        </div>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    useEffect(() => {
        getAllSampleTest()
        getAllQuestionBank()
    }, [])

    const getAllSampleTest = () => {
        setLoading(true)
        getSampleTest().then((res) => {
            if (res.status === 200) {
                setLoading(false)
                setSampleTest(res.data.data.SampleTest)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllQuestionBank = () => {
        getQuestionBank().then((res) => {
            if (res.status === 200) {
                setQuestionBank(res.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const findQuestionBankNameById = (questionBankId) => {
        const questionBankName = questionBank.find((item) => item._id === questionBankId)
        return questionBankName ? questionBankName.questionBankName : ''
    }

    const handleDelete = (record) => {
        deleteSampleTest(record._id).then((res) => {
            if (res.status === 204) {
                getAllSampleTest()
                notification.success({
                    message: 'Xóa thành công'
                })
            }
        }).catch((err) => {
            notification.error({
                message: 'Chức năng chưa được hỗ trợ'
            })
        })
    }

    return (
        <div>
            <Row>
                <Col flex="100px"><Sidebar /></Col>
                <Col flex="auto">
                    <div>
                        <Space style={{ padding: 16 }}><Button type="primary" onClick={() => setIsOpen(true)}>Thêm bài thi thử</Button></Space>
                        <AddModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        questionBank={questionBank}
                        getAllSampleTest={getAllSampleTest}
                        />
                        <Table loading={loading} pagination={{ pageSize: 8 }} columns={columns} dataSource={sampleTest} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default SampleTest