import { Col, Row, notification } from 'antd';
import Button from 'antd/lib/button/button';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoutAccount } from '../../apis/UserService';
import { useEffect } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { sendAbsentRequest } from '../../apis/AbsentService';

const Header = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

  // Function to handle the absent request form submission
  const handleAbsentRequest = (values) => {
    const realDate = moment(values.dateAbsent)._i;
    sendAbsentRequest(
      JSON.parse(localStorage.getItem('user'))._id,
      values.reason,
      realDate.format('YYYY-MM-DD'),
    )
      .then((res) => {
        if (res.status === 201) {
          notification.success({
            message: 'Gửi yêu cầu thành công',
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        if (err) {
          notification.error({
            message: 'Gửi yêu cầu thất bại',
            placement: 'bottomRight',
          });
        }
      });
    // You can perform API calls or other actions here
    setModalVisible(false); // Close the modal after form submission
  };

  // Function to handle canceling the absent request form
  const handleCancel = () => {
    setModalVisible(false); // Close the modal
  };

  const items = [
    {
      label: 'Hồ Sơ',
      key: 'profile',
      onClick: () => {
        navigate('/profile');
      },
    },
    {
      label: 'Lịch Học',
      key: 'schedule',
      onClick: () => {
        navigate('/schedule');
      },
    },
    {
      label: 'Đăng Xuất',
      key: 'logout',
      onClick: () => {
        logoutAccount();
      },
    },
  ];

  const headerSection = [
    {
      label: 'Trang chủ',
      link: '/',
    },
    {
      label: 'Ôn Tập',
      link: '/quizpage',
    },
    {
      label: 'Thi Thử',
      link: '/practice-test',
    },
    {
      label: 'Đặt Lịch',
      link: '/booking',
    },
    {
      label: 'Tin tức',
      link: '/news',
    },
    {
      label: 'Về chúng tôi',
      link: '/about',
    },
  ];

  const isAdmin =
    localStorage.getItem('isAdmin') === 'true'
      ? items.splice(1, 0, {
          label: 'Quản lý',
          key: 'admin',
          onClick: () => {
            navigate('/dashboard/QuestionPage');
          },
        })
      : null;

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user?.role == 'teacher') {
    items.splice(1, 0, {
      label: 'Xin nghỉ phép',
      key: 'absent',
      onClick: () => {
        setModalVisible(true);
      }, // Open the modal when button is clicked
    });
  }

  if (user && user?.role == 'user') {
    items.splice(1, 0, {
      label: 'Lịch sử làm bài',
      key: 'testHistory',
      onClick: () => {
        navigate('/test-history');
      },
    });
  }

  const validateDate = (_, value) => {
    if (value && value.isBefore(moment().add(2, 'days'))) {
      return Promise.reject(
        'Ngày nghỉ phải là ít nhất 2 ngày sau ngày hiện tại',
      );
    }
    return Promise.resolve();
  };
  const userava = JSON.parse(localStorage.getItem('user'));

  return (
    <div id="header" className={styles.header}>
      <img
        src="/src/assets/images/Website_Logo.png"
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.centerName}>Ôn Tập Lái Xe</div>
      <Row className={styles.header__section}>
        {headerSection.map((item, index) => (
          <Col span={4} key={index}>
            <Link to={item.link}>{item.label}</Link>
          </Col>
        ))}
      </Row>
      <div>
        {localStorage.getItem('token')?.length > 0 ? (
          <div>
            <Dropdown menu={{ items }} trigger={['hover']}>
              <Avatar
                className={styles.profile}
                icon={<img src={userava.avatar} />}
              />
            </Dropdown>
          </div>
        ) : (
          <Link to="/login">
            <Button className={styles.button} type="primary">
              Đăng Nhập
            </Button>
          </Link>
        )}
        {/* Absent Request Modal */}
        <Modal
          title="Xin nghỉ phép"
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleAbsentRequest}>
            <Form.Item
              name="reason"
              label="Lý do"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lý do',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dateAbsent"
              label="Ngày nghỉ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày nghỉ',
                },
                {
                  validator: validateDate,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default Header;
