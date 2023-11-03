import { useState, useEffect } from 'react';
import { getAllBookings, getStudentBookings } from '../../apis/BookingService';
import { Calendar, Col, Row, Badge } from 'antd';
import { Modal } from 'antd';

const SchedualPage = () => {
  const [booking, setBooking] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const handleTimeClick = (timeStart, timeEnd) => {
    // Hiển thị modal
    setModalVisible(true);

    // Xử lý logic khác nếu cần
  };

  useEffect(() => {
    getStudentBooking();
  }, []);

  // const getUserBooking = () => {
  //   getAllBookings()
  //     .then((res) => {
  //       console.log(res.data.data.Booking);
  //       res.data.data.Booking.filter((item) => {
  //         if (item.user._id == JSON.parse(localStorage.getItem('user'))._id) {
  //           setBooking((booking) => [...booking, item]);
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const date = new Date().toISOString().slice(0, 10);

  const getStudentBooking = () => {
    getStudentBookings(date, JSON.parse(localStorage.getItem('user'))._id)
      .then((res) => {
        console.log(res.data.data.Booking);
        setBooking(res.data.data.Booking);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div key={item.timeStart}>
            <div
              onClick={() => {
                handleTimeClick(item.timeStart, item.timeEnd);
                const info = item.detail;
                const details = {
                  teacher: info.teacher.name,
                  avatar: info.teacher.avatar,
                  course: info.course.courseName,
                  car: info.car.name,
                  carPlate: info.car.licensePlate,
                  timeStart: item.timeStart,
                  timeEnd: item.timeEnd,
                };
                setDetail(details);
              }}
            >
              <Badge status="success" style={{ marginRight: '10px' }} />
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
          <Calendar cellRender={cellRender} />
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
              <p>Giáo viên: {detail.teacher}</p>
              <p>Khóa học: {detail.course}</p>
              <p>
                Xe: {detail.car} ({detail.carPlate})
              </p>
              <p>
                Thời gian: {detail.timeStart}-{detail.timeEnd}
              </p>
            </div>
            <div>
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
            </div>
          </div>
        </Modal>
      </Row>
    </div>
  );
};

export default SchedualPage;
