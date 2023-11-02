import React, { useEffect, useRef, useState } from 'react';
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
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Sidebar from '../../../components/sidebar/Sidebar';
import { getAllBookings } from '../../../apis/BookingService';

import BookingCss from './Booking.module.css';

const slot = [
  {
    slotInfo: 'slot 1',
    time: '07:00',
  },
  {
    slotInfo: 'slot 2',
    time: '09:15',
  },
  {
    slotInfo: 'slot 3',
    time: '13:00',
  },
  {
    slotInfo: 'slot 4',
    time: '15:15',
  },
  {
    slotInfo: 'slot 5',
    time: '17:30',
  },
  {
    slotInfo: 'slot 6',
    time: '06:30',
  },
];

const ManageBooking = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    getAllBookings()
      .then((rs) => {
        const data = rs.data.data.Booking;

        const result = [];
        for (let i = 0; i < data.length - 1; i++) {
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
      .catch((err) => {
        notification.error({
          message: 'Error when getting the booking data',
        });
        setLoading(false);
      });
  }, []);

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
                <li>{record?.details.user?.email}</li>
              </ul>
            </div>
            <div>
              Mentor:
              <ul className={BookingCss.itemList}>
                <li>{record?.details.teacher?.name}</li>
                <li>{record?.details.teacher?.email}</li>
              </ul>
            </div>
          </div>
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
          <div onClick={() => console.log(bookingData)}>click me</div>
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
        </Col>
      </Row>
    </div>
  );
};

export default ManageBooking;
