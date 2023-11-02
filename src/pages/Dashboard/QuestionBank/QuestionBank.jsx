import { useEffect, useState } from 'react';
import {
  deleteQuestionBank,
  getQuestionBank,
} from '../../../apis/QuestionService';
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  notification,
  Layout,
} from 'antd';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useNavigate, Link } from 'react-router-dom';
const QuestionBank = () => {
  const [loading, setLoading] = useState(false);
  const [questionBank, setQuestionBank] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Đề',
      dataIndex: 'questionBankName',
    },
    {
      title: 'Loại Bằng',
      dataIndex: 'driveType',
    },
    {
      title: 'Tác Vụ',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              handleDetail(record);
            }}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc là muốn xóa danh mục này?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record);
            }}
          >
            <div>
              <Button type="primary" danger>
                Xóa
              </Button>
            </div>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getAllQuestionBank = () => {
    setLoading(true);
    getQuestionBank().then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setQuestionBank(res.data.data.QuestionBank);
      }
    });
  };

  const handleDetail = (record) => {
    navigate(`/dashboard/QuestionBankPage/${record._id}`, { state: record });
  };

  const handleDelete = (record) => {
    deleteQuestionBank(record._id)
      .then((res) => {
        if (res.status === 204) {
          getAllQuestionBank();
          notification.success({
            message: 'Xóa thành công',
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'Xóa thất bại',
        });
      });
  };

  useEffect(() => {
    getAllQuestionBank();
  }, []);

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
            <Space style={{ padding: 16 }}>
              <Link to="/dashboard/QuestionBankPage/add">
                <Button type="primary">Thêm Đề Mới</Button>
              </Link>
            </Space>
            <Table
              loading={loading}
              pagination={{ pageSize: 8 }}
              columns={columns}
              dataSource={questionBank}
            />
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionBank;
