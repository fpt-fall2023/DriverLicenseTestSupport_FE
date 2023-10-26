import { useState, useEffect } from 'react';
import { getAllBookings } from '../../apis/BookingService';
import { Calendar, Col, Row } from 'antd';
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
    getUserBooking();
  }, []);

  const getUserBooking = () => {
    getAllBookings()
      .then((res) => {
        console.log(res.data.data.Booking);
        res.data.data.Booking.filter((item) => {
          if (item.user._id == JSON.parse(localStorage.getItem('user'))._id) {
            setBooking((booking) => [...booking, item]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListData = (value) => {
    let listData;
    booking.map((item) => {
      if (item.date === value.format('YYYY-MM-DD')) {
        listData = [
          { timeStart: item.timeStart, timeEnd: item.timeEnd, detail: item },
        ];
      }
    });
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
                  course: info.course.courseName,
                  car: info.car.name,
                  timeStart: item.timeStart,
                  timeEnd: item.timeEnd,
                };
                setDetail(details);
              }}
            >
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
    <Row>
      <Col span={24}>
        <Calendar cellRender={cellRender} />
      </Col>
      <Col span={24}></Col>
      <Modal
        title="Thông tin buổi học"
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <p>{detail.teacher}</p>
        <p>{detail.course}</p>
        <p>{detail.car}</p>
        <p>
          {detail.timeStart}-{detail.timeEnd}
        </p>
      </Modal>
    </Row>
  );
};

export default SchedualPage;
