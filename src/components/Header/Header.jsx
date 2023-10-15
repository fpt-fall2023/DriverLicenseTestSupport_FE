import { Col, Row } from 'antd';
import Button from 'antd/lib/button/button';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoutAccount } from '../../apis/UserService';

const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: 'Hồ Sơ',
      key: 'profile',
      onClick: () => {
        navigate('/profile');
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
      label: 'Thi thử',
      link: '/',
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

  return (
    <div id="header" className={styles.header}>
      <img
        src="src/assets/images/Website_Logo.png"
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
              <Avatar className={styles.profile} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        ) : (
          <Link to="/login">
            <Button className={styles.button} type="primary">
              Đăng Nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
