import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { Col, Row, Button, Input, Space, Table, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Sidebar from '../../../components/sidebar/sidebar';
import { getAllBookings } from '../../../apis/BookingService';

// const sampleBooking = {
//   key: null,
//   teacher: null,
//   student: null,
//   timeStart: null,
//   date: null,
//   course: null,
//   car: null,
//   details: {},
// };

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
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
      ...getColumnSearchProps('date'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Time Start',
      dataIndex: 'timeStart',
      key: 'timeStart',
      width: '20%',
      // sorter: (a, b) => sortTime(a, b),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('timeStart'),
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      width: '20%',
      ...getColumnSearchProps('student'),
    },
    {
      title: 'Car',
      dataIndex: 'car',
      key: 'car',
      width: '10%',
      ...getColumnSearchProps('car'),
    },
  ];

  useEffect(() => {
    getAllBookings()
      .then((rs) => {
        const data = rs.data.data.Booking;
        const result = data.map((booking, index) => {
          let sample = {};
          sample.key = index;
          sample.teacher = booking.teacher.name;
          sample.course = booking.course.courseName;
          sample.date = booking.date;
          sample.timeStart = booking.timeStart;
          sample.student = booking.user.name;
          sample.car = booking.car.licensePlate;
          sample.details = booking;
          return sample;
        });
        setBookingData(result);
      })
      .catch((err) => {
        notification.error('Error when getting the booking data');
      });
  }, []);

  // const sortTime = (a, b) => {
  //   const varA = Number(a.toString().split(':').join(''));
  //   const varB = Number(b.toString().split(':').join(''));
  //   return varA - varB;
  // };

  return (
    <div>
      <Row>
        <Col flex="100px">
          <Sidebar />
        </Col>
        <Col flex="auto">
          <div>
            <Table columns={columns} dataSource={bookingData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManageBooking;
