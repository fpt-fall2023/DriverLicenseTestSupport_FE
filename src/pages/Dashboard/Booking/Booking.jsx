import React, { useEffect, useReducer, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import {
  Col,
  Row,
  Button,
  Input,
  Space,
  Table,
  notification,
  Spin,
  Divider,
  Layout,
  Modal,
  DatePicker,
  Popconfirm,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Sidebar from '../../../components/sidebar/Sidebar';
import {
  deleteBooking,
  getAllBookings,
  updateDateBooking,
} from '../../../apis/BookingService';

import BookingCss from './Booking.module.css';

const ManageBooking = () => {
  const dateFormat = 'YYYY-MM-DD';
  //Table booking
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  //Update Booking
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [dateUpdate, setDateUpdate] = useState('');
  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0);

  const showModal = (data) => {
    setDataUpdate(data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const id = dataUpdate?.details?._id;
    if (dataUpdate && dateUpdate && id) {
      updateDateBooking(id, dateUpdate)
        .then(() => notification.success({ message: 'Update thành công' }))
        .catch(() =>
          notification.error({
            message: 'Update lỗi, xin lỗi vì sự bất tiện này',
          }),
        );
    } else {
      notification.warning({ message: 'Ngày nhập vào trống!!!' });
    }
    setIsModalOpen(false);
    setForceUpdate();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date, dateString) => {
    setDateUpdate(dateString);
  };

  const popConfirm = () => {
    const bookingId = dataUpdate?.details?._id;
    if (bookingId) {
      deleteBooking(bookingId)
        .then(() => notification.success({ message: 'Xóa thành công!' }))
        .catch(() => {
          notification.error({ message: 'Xóa không thành công' });
        });
    } else {
      notification.warning({ message: 'ID không tồn tại!!!' });
    }
    setForceUpdate();
  };
  const popCancel = () => {};

  //Table settings
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
      width: '20%',
      ...getColumnSearchProps('teacher'),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      width: '20%',
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Time Start',
      dataIndex: 'timeStart',
      key: 'timeStart',
      // sorter: (a, b) => sortTime(a, b),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('timeStart'),
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      width: '15%',
      ...getColumnSearchProps('student'),
    },
    {
      title: 'Car',
      dataIndex: 'car',
      key: 'car',
      width: '15%',
      ...getColumnSearchProps('car'),
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllBookings()
      .then((rs) => {
        const data = rs.data.data.Booking;
        const result = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i]) {
            let sample = {};
            sample.key = i;
            sample.teacher = data[i].teacher?.name || 'None';
            sample.course = data[i].course?.courseName || 'None';
            sample.date = data[i].date;
            sample.timeStart = data[i].timeStart;
            sample.student = data[i].user.name;
            sample.car = data[i].car.licensePlate;
            sample.details = data[i];
            result.push(sample);
          }
        }
        setBookingData(result);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: 'Error when getting the booking data',
        });
        setLoading(false);
      });
  }, [forceUpdate]);

  // const sortTime = (a, b) => {
  //   const varA = Number(a.toString().split(':').join(''));
  //   const varB = Number(b.toString().split(':').join(''));
  //   return varA - varB;
  // };

  const description = (record) => {
    return (
      <div className={BookingCss.descriptionContainer}>
        <div>
          <label className={BookingCss.descriptionHeader}>Course</label>
          <div className={BookingCss.descriptionBox}>
            <div>
              Car:
              <ul className={BookingCss.itemList}>
                <li>{record?.details?.car?.name}</li>
                <li>{record?.details?.car?.licensePlate}</li>
              </ul>
            </div>
            <div>Course: {record?.details?.course?.courseName}</div>
            <div>Date: {record?.details?.date}</div>
            <div>Time start: {record?.details?.timeStart}</div>
          </div>
        </div>
        <Divider type="vertical" className={BookingCss.dividerVertical} />
        <div>
          <label className={BookingCss.descriptionHeader}>Participants</label>
          <div className={BookingCss.descriptionBox}>
            <div>
              Students:
              <ul className={BookingCss.itemList}>
                <li>{record?.details.user?.name}</li>
                <li>{record?.details.user?.phone || 'none'}</li>
                <li>{record?.details.user?.email}</li>
              </ul>
            </div>
            <div>
              Mentor:
              <ul className={BookingCss.itemList}>
                <li>{record?.details.teacher?.name}</li>
                <li>{record?.details.teacher?.phone || 'none'}</li>
                <li>{record?.details.teacher?.email}</li>
              </ul>
            </div>
          </div>
        </div>
        <Divider type="vertical" className={BookingCss.dividerVertical} />
        <div className={BookingCss.actionContainer}>
          <Button
            onClick={() => showModal(record)}
            style={{ marginBottom: '10px' }}
            type="primary"
            size={'middle'}
          >
            Update
          </Button>
          <Popconfirm
            title="Xóa lịch"
            description="Bạn có muốn xóa ngày booking này không?"
            onConfirm={popConfirm}
            onCancel={popCancel}
            okText="Có"
            cancelText="Không"
          >
            <Button onClick={() => setDataUpdate(record)} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
    );
  };

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
            <div>
              <Spin spinning={loading} delay={300}>
                <Table
                  columns={columns}
                  expandable={{
                    expandedRowRender: (bookingData) => (
                      <div
                        style={{
                          margin: 0,
                        }}
                      >
                        {description(bookingData)}
                      </div>
                    ),
                    // rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                  dataSource={bookingData}
                />
              </Spin>
            </div>
          </Layout>
        </Col>
      </Row>
      <Modal
        title="Update Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Current day: {dataUpdate?.date}</p>

        <p>Update to:</p>
        <DatePicker format={dateFormat} onChange={formatDate} />
      </Modal>
    </div>
  );
};

export default ManageBooking;
