import { useState, useEffect } from 'react';
import { getAllBookings, getStudentBookings } from '../../apis/BookingService';
import { Calendar, Col, Row, Badge, Spin } from 'antd';
import { Modal } from 'antd';

const SchedualPage = () => {
  const [booking, setBooking] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [modalVisible, setModalVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const [onFetchData, setOnFetchData] = useState(false);

  const handleTimeClick = (timeStart, timeEnd) => {
    // Hiển thị modal
    setModalVisible(true);

    // Xử lý logic khác nếu cần
  };

  useEffect(() => {
    getStudentBooking();
  }, []);

  const date = new Date().toISOString().slice(0, 10);

  const getStudentBooking = () => {
    const role = JSON.parse(localStorage.getItem('user')).role;
    if (role === 'teacher') {
      setOnFetchData(true)
      getStudentBookings(
        JSON.parse(localStorage.getItem('user'))._id,
        'teacher',
      )
        .then((res) => {
          setOnFetchData(false)
          setBooking(res.data.data.Booking);
        })
        .catch((err) => {
          setOnFetchData(false)
          console.log(err);
        });
    } else {
      setOnFetchData(true)
      getStudentBookings(JSON.parse(localStorage.getItem('user'))._id, 'user')
        .then((res) => {
          setOnFetchData(false)
          console.log(res.data.data.Booking);
          setBooking(res.data.data.Booking);
        })
        .catch((err) => {
          setOnFetchData(false)
          console.log(err);
        });
    }
  };

  const getListData = (value) => {
    const listData = booking
      .filter((item) => item.date === value.format('YYYY-MM-DD'))
      .map((item) => ({
        type: 'success',
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
        detail: item,
      }));

    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div>
        {listData.map((item) => (
          <div key={item._id}>
            <div
              onClick={() => {
                handleTimeClick(item.timeStart, item.timeEnd);
                const info = item.detail;
                if (user.role === 'teacher') {
                  const details = {
                    teacher: info.user.name,
                    avatar: null,
                    course: info.course.courseName,
                    car: info.car.name,
                    carPlate: info.car.licensePlate,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd,
                  };
                  setDetail(details);
                } else {
                  if (user.role === 'user') {
                    const details = {
                      teacher: info.teacher.name,
                      avatar: info.teacher.avatar ? info.teacher.avatar : null,
                      course: info.course.courseName,
                      car: info.car.name,
                      carPlate: info.car.licensePlate,
                      timeStart: item.timeStart,
                      timeEnd: item.timeEnd,
                    };
                    setDetail(details);
                  }
                }
              }}
            >
              <Badge status={`${date <= item?.detail?.date ? 'success' : 'error'}`} style={{ marginRight: '10px' }} />
              {item.timeStart}-{item.timeEnd}
            </div>
          </div>
        ))}
      </div>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={18}>
          <Spin spinning={onFetchData}>
            <Calendar cellRender={cellRender} />
          </Spin>
        </Col>
        <Modal
          title="Thông tin buổi học"
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        >
          <div
            style={{ fontSize: '17px', display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1 }}>
              <p>
                {user.role === 'teacher' ? 'Người học:' : 'Giáo viên:'}{' '}
                {detail.teacher}
              </p>
              <p>Khóa học: {detail.course}</p>
              <p>
                Xe: {detail.car} ({detail.carPlate})
              </p>
              <p>
                Thời gian: {detail.timeStart}-{detail.timeEnd}
              </p>
            </div>
            <div>
              {user.role === 'teacher' ? null : (
                <img
                  src={detail.avatar}
                  alt="avatar"
                  style={{
                    width: '180px',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '10%',
                  }}
                />
              )}
            </div>
          </div>
        </Modal>
      </Row>
    </div>
  );
};

export default SchedualPage;
