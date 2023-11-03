import { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Select,
  notification,
} from 'antd';
import {
  createBooking,
  getAvailableTeacher,
  getAvailableTime,
} from '../../apis/BookingService';
import moment from 'moment';

const Booking = () => {
  //isSelected check
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [isTeacherSelected, setIsTeacherSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isSlotSelected, setIsSlotSelected] = useState(false);

  //avaiable teacher and slot
  const [teacher, setTeacher] = useState([]);
  const [slot, setSlot] = useState([]);

  //date and time
  const [next7days, setNext7days] = useState([]);

  const [form] = Form.useForm();

  const mainLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    getAllAvaiableTeacher();
    get7days();
  }, []);

  const getAllAvaiableTeacher = () => {
    getAvailableTeacher()
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setTeacher(res.data.availableTeacher);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAvailableSlot = (teacherId, selectedDate) => {
    getAvailableTime(teacherId, selectedDate)
      .then((res) => {
        if (res.status === 200) {
          setSlot(res.data.availableSlots);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get7days = () => {
    const today = new Date();
    const next7days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      next7days.push(nextDay);
    }
    setNext7days(next7days);
  };

  const disabledDate = (current) => {
    const today = new Date();
    return (
      current &&
      current < moment(today.setDate(today.getDate() -1)).endOf('day')
    );
  };

  const onFinish = (values) => {
    values.date = (moment(values.date)._i).format('YYYY-MM-DD');
    createBooking(
      JSON.parse(localStorage.getItem('user'))._id,
      values.teacher,
      values.course,
      values.date,
      values.slot,
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          notification.success({
            message: 'Đặt lịch thành công',
            placement: 'topRight',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'Đặt lịch thất bại',
          placement: 'topRight',
        });
      });
  };

  return (
    <div className={styles.Booking}>
      <img
        style={{ width: '100%', height: '350px', objectFit: 'cover' }}
        src="https://vidamco.com.vn/wp-content/uploads/2022/12/bang-lai-xe-viet-nam-dung-duoc-o-nuoc-nao-3.jpg"
      />
      <Card
        title="Đặt lịch học"
        bordered={false}
        style={{ width: '50%', marginTop: '-5rem' }}
      >
        <Form {...mainLayout} form={form} onFinish={onFinish}>
          <Form.Item
            label="Khóa học"
            name="course"
            rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
          >
            <Select
              placeholder="Chọn khóa học"
              style={{ width: '40%' }}
              onChange={(e) => setIsCourseSelected(true)}
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
              style={{ width: '40%' }}
              onChange={(e) => setIsTeacherSelected(true)}
            >
              {teacher?.map((item, index) => (
                <Select.Option key={index} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày học" name="date" hidden={!isTeacherSelected}>
            <DatePicker
              disabledDate={disabledDate}
              onChange={(e) => {
                setIsDateSelected(true);
                getAvailableSlot(form.getFieldValue('teacher'), (moment(e)._i).format('YYYY-MM-DD'));
              }}
            />
          </Form.Item>
          <Form.Item
            label="Giờ học"
            name="slot"
            rules={[{ required: true, message: 'Vui lòng chọn giờ học' }]}
            hidden={!isDateSelected}
          >
            <Select
              placeholder="Chọn giờ học"
              style={{ width: '40%' }}
              onChange={(e) => setIsSlotSelected(true)}
            >
              {slot?.map((item, index) => (
                <Select.Option key={index} value={item.time}>
                  {item.time}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item hidden={!isSlotSelected} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button type="primary" htmlType="submit">
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;
