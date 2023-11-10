import { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import { Button, Card, DatePicker, Form, Select, notification } from 'antd';
import {
  createBooking,
  getAvailableTeacher,
  getAvailableTime,
} from '../../apis/BookingService';
import moment from 'moment';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { TeacherProfile } from './TeacherProfile';

const Booking = () => {
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [isTeacherSelected, setIsTeacherSelected] = useState(false);
  const [booking, setBooking] = useState({
    user: JSON.parse(localStorage.getItem('user'))._id,
    teacher: '',
    course: '',
    date: `${new Date().toISOString().split("T")[0]}`,
    timeStart: ''
  })
  const [isOnCreateBooking, setOnCreateBooking] = useState(false);

  // on change selected
  const [dateSelected, setDateSelected] = useState(new Date().toISOString().split("T")[0]);
  const [teacherSelectedId, setTeacherSelected] = useState('');
  const [slotSelected, setSlotSelected] = useState('');
  const [teacherProfile, setTeacherProfile] = useState('');

  //avaiable teacher and slot
  const [teacher, setTeacher] = useState([]);
  const [slot, setSlot] = useState(null);

  //date and time
  // const [next7days, setNext7days] = useState([]);

  const [form] = Form.useForm();
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    getAllAvaiableTeacher(dateSelected);
    // get7days();
  }, [dateSelected]);

  useEffect(() => {
    if (teacherSelectedId) {
      getAvailableTime(teacherSelectedId, dateSelected)
        .then((res) => {
          if (res.status === 200) {
            setSlot(res.data.availableSlots);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [teacherSelectedId, dateSelected])

  const getAllAvaiableTeacher = (date) => {
    getAvailableTeacher(date)
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setTeacher(res.data.availableTeacher);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const get7days = () => {
  //   const today = new Date();
  //   const next7days = [];
  //   for (let i = 0; i < 7; i++) {
  //     const nextDay = new Date(today);
  //     nextDay.setDate(today.getDate() + i);
  //     next7days.push(nextDay);
  //   }
  //   setNext7days(next7days);
  // };

  const disabledDate = (current) => {
    const today = new Date();
    return (
      current &&
      current < moment(today.setDate(today.getDate() - 1)).endOf('day')
    );
  };

  const onFinish = () => {
    if (!booking.teacher || !booking.course || !booking.timeStart) {
      notification.error({
        message: 'Vui lòng điền đầy đủ thông tin đăng ký',
        placement: 'topRight',
      });
      return;
    }

    setOnCreateBooking(true)
    createBooking(
      JSON.parse(localStorage.getItem('user'))._id,
      booking.teacher,
      booking.course,
      booking.date,
      booking.timeStart,
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setOnCreateBooking(false);
          notification.success({
            message: 'Đặt lịch thành công',
            placement: 'topRight',
          });
          form.resetFields();
          setSlot('')
          setIsTeacherSelected(false);
          setIsCourseSelected(false);
          setTeacherProfile('')
        }
      })
      .catch((err) => {
        setOnCreateBooking(false);
        notification.error({
          message: err.response.data.message || 'Đặt lịch thất bại',
          placement: 'topRight',
        });
      });
  };

  return (
    <div className={styles.Booking}>
      <img
        style={{ width: '100%', height: '350px', objectFit: 'cover' }}
        src="https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-si%C3%AAu-xe-Lamborghini-c%E1%BB%B1c-ng%E1%BA%A7u.jpg"
      />
      <Card
        title="Đặt lịch học"
        bordered={false}
        style={{ width: '40%', marginTop: '-5rem', minHeight: 300 }}
        actions={[
          <Button key="button" type="primary" htmlType="submit" size='large' onClick={onFinish} loading={isOnCreateBooking}>
            Đặt lịch
          </Button>
        ]}
      >
        <Form form={form} style={{ display: 'flex', gap: '50px' }} layout="vertical">
          <div style={{ width: '300px' }}>
            <Form.Item
              label="Khóa học"
              name="course"
              rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}

            >
              <Select
                placeholder="Chọn khóa học"
                onChange={(value) => {
                  setIsCourseSelected(true)
                  setBooking((booking) => ({ ...booking, course: value }))
                }
                }
              >
                <Select.Option value="6532293c25b0279a5ab1d444">
                  Khóa học bằng lái xe B1
                </Select.Option>
                <Select.Option value="6532296a3be4876a9a05dcbf">
                  Khóa học bằng lái xe B2
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Giáo viên"
              name="teacher"
              rules={[{ required: true, message: 'Vui lòng chọn giáo viên' }]}
              hidden={!isCourseSelected}
            >
              <Select
                placeholder="Chọn giáo viên"
                onChange={(value) => {
                  setSlot(null);
                  setIsTeacherSelected(true)
                  const selectedTeacherObject = teacher.find(item => item._id === value);
                  setTeacherProfile(selectedTeacherObject)
                  setTeacherSelected(value)
                  setBooking((booking) => ({ ...booking, teacher: value }))
                }}
              >
                {teacher?.map((item, index) => (
                  // <Spin key={index} spinning={true}> 
                    <Select.Option key={index}  value={item._id}>
                      {item.name}
                    </Select.Option>
                  // </Spin>
                ))}
              </Select>
            </Form.Item>
            {
              teacherProfile && <TeacherProfile teacher={teacherProfile} />
            }
          </div>

          <div style={{ width: '300px' }}>
            <Form.Item
              rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
              label="Ngày học"
              name="date"
              style={{ width: '100%' }}
            // hidden={!isTeacherSelected}
            >
              <DatePicker
                disabledDate={disabledDate}
                defaultValue={dayjs(date)}
                onChange={(_, dateString) => {
                  setSlot([])
                  setTeacher(null)
                  setDateSelected(dateString);
                  // setIsDateSelected(true);
                  setBooking((booking) => ({ ...booking, date: dateString }))
                }}
              />
            </Form.Item>
            <Form.Item label="Giờ học" required hidden={!isTeacherSelected}>
              <div  >
                {
                  slot && slot.length > 0 ?
                    slot.map((item) => {
                      return (
                        <strong
                          style={{
                            padding: '7px 10px',
                            cursor: 'pointer',
                            border: `${item.time === slotSelected ? "1px solid #1677ff" : ""}`,
                            borderRadius: '8px',
                            margin: '5px',
                            background: `${item.time === slotSelected ? '#fff' : '#f7f7f7'}`,
                            color: `${item.time === slotSelected ? '#1677ff' : '#717171'}`,
                            transition: 'color 0.3s'
                          }}
                          key={item._id}
                          onClick={() => {
                            setSlotSelected(item.time)
                            setBooking((booking) => ({ ...booking, timeStart: item.time }))
                          }}
                        >
                          {item.time}
                        </strong>
                      )
                    })
                    :
                    teacherSelectedId ?
                      <Spin tip="Đang cập nhật khung giờ còn trống...">
                        <div className="content" />
                      </Spin> : ""
                }
              </div>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;
