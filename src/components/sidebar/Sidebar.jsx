import {
  UserOutlined,
  QuestionOutlined,
  UnorderedListOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  CalendarOutlined,
  CarOutlined,

  InsertRowAboveOutlined

} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className={styles.SideMenu}>
      <Menu
        className={styles.SideMenuVertical}
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: 'QUẢN LÝ NGƯỜI DÙNG',
            key: '/dashboard/UserPage',
            icon: <UserOutlined />,
          },
          {
            label: 'QUẢN LÝ CÂU HỎI',
            key: '/dashboard/QuestionPage',
            icon: <QuestionOutlined />,
          },
          {
            label: 'QUẢN LÝ DANH MỤC CÂU HỎI',
            key: '/dashboard/CategoryPage',
            icon: <UnorderedListOutlined />,
          },
          {
            label: 'QUẢN LÝ DANH MỤC BIỂN BÁO',
            key: '/dashboard/TrafficCategoryPage',
            icon: <UnorderedListOutlined />,
          },
          {
            label: 'QUẢN LÝ NGÂN HÀNG CÂU HỎI',
            key: '/dashboard/QuestionBankPage',
            icon: <QuestionCircleOutlined />,
          },
          {
            label: 'QUẢN LÝ BÀI THI THỬ',
            key: '/dashboard/SampleTestPage',
            icon: <BookOutlined />,
          },
          {
            label: 'QUẢN LÝ BOOKING KHÓA HỌC',
            key: '/dashboard/ManageBooking',
            icon: <CalendarOutlined />,
          },
          {
            label: 'QUẢN LÝ SLOT HỌC',
            key: '/dashboard/Slot',
            icon: <UserOutlined />,
          },
          {
            label: 'QUẢN LÝ KHÓA HỌC',
            key: '/dashboard/Course',
            icon: <CalendarOutlined />,
          },
          {
            label: 'QUẢN LÝ XE',
            key: '/dashboard/Car',
            icon: <CarOutlined />,
          },
          {
            label: "QUẢN LÝ LỊCH NGHỈ",
            key: "/dashboard/Absent",
            icon: <InsertRowAboveOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default Sidebar;
