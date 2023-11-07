import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Layout,
  Row,
  Space,
  Spin,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useReducer } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerCard from './DrawerCard';
import { ModalAdd } from './ModalAdd';

const initialState = {
  listScheduleChangeNotice: [],
  showDrawer: false,
  showModalAdd: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, listScheduleChangeNotice: action.payload };
    case 'showDrawer':
      return { ...state, showDrawer: !state.showDrawer };
    case 'showModal':
      return { ...state, showModalAdd: !state.showModalAdd };
    default:
      throw new Error('Action unknown');
  }
}

const ChangeScheduleNotice = () => {
  const [{ listScheduleChangeNotice, showDrawer, showModalAdd }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const columns = [
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Lời nhắn',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Ngày dời lịch dự kiến',
      dataIndex: 'proposedDate',
      key: 'proposedDate',
    },
    {
      title: 'Danh sách học viên',
      key: 'student',
      dataIndex: 'student',
      render: (_, record) => (
        <>
          <Button
            type="dashed"
            block
            onClick={() => dispatch({ type: 'showDrawer' })}
          >
            Detail
          </Button>
          <Drawer
            title="Chi tiết danh sách học viên"
            placement="right"
            onClose={() => dispatch({ type: 'showDrawer' })}
            open={showDrawer}
          >
            {record &&
              record.student.length > 0 &&
              record.student.map((item) => {
                return <DrawerCard item={item} key={item._id} />;
              })}
          </Drawer>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined style={{ cursor: 'pointer', color: '#1677ff' }} />
          <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getAllScheduleChangeNotice = async () => {
      const res = await axios.get('http://localhost:8800/api/v1/schedule', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.status === 'success') {
        dispatch({
          type: 'dataReceived',
          payload: res.data.data.ScheduleChangeNotice,
        });
      }
    };

    getAllScheduleChangeNotice();
  }, []);

  const data = listScheduleChangeNotice.map((item) => {
    return {
      key: item._id,
      message: item.message,
      teacher: item.teacher.name,
      proposedDate: item.proposedDate.split('T')[0],
      student: item.students,
    };
  });

  //   console.log(listScheduleChangeNotice);
  return (
    <Row>
      <Col flex="100px">
        <Sidebar />
      </Col>
      <Layout
        style={{
          padding: 24,
          margin: 0,
        }}
      >
        <Button
          type="primary"
          style={{ width: 'fit-content', marginBottom: '10px' }}
          onClick={() => dispatch({ type: 'showModal' })}
        >
          Tạo thông báo đổi lịch
        </Button>
        <Spin spinning={!(listScheduleChangeNotice.length > 0)}>
          <Table columns={columns} dataSource={data} />
        </Spin>
      </Layout>
      <ModalAdd isModalOpen={showModalAdd} handleCancel={dispatch} handleOk={dispatch}/>
    </Row>
  );
};

export default ChangeScheduleNotice;
