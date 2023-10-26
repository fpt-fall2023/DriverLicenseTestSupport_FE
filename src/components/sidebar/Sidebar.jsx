import {
    AppstoreOutlined,
    UserOutlined,
    QuestionOutlined,
    UnorderedListOutlined,
    QuestionCircleOutlined,
    BookOutlined,
    AuditOutlined
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import styles from "./Sidebar.module.css"
  
  function Sidebar() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
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
              label: "TỔNG QUÁT",
              icon: <AppstoreOutlined />,
              key: "/dashboard",
            },
            {
              label: "QUẢN LÍ NGƯỜI DÙNG",
              key: "/dashboard/UserPage",
              icon: <AuditOutlined />,
            },
            {
              label: "QUẢN LÍ CÂU HỎI",
              key: "/dashboard/QuestionPage",
              icon: <QuestionOutlined />,
            },
            {
              label: "QUẢN LÍ DANH MỤC CÂU HỎI",
              key: "/dashboard/CategoryPage",
              icon: <UnorderedListOutlined />,
            },
            {
              label: "QUẢN LÍ DANH MỤC BIỂN BÁO",
              key: "/dashboard/TrafficCategoryPage",
              icon: <UnorderedListOutlined />,
            },
            {
              label: "QUẢN LÍ NGÂN HÀNG CÂU HỎI",
              key: "/dashboard/QuestionBankPage",
              icon: <QuestionCircleOutlined />,
            },
            {
              label: "QUẢN LÍ BÀI THI THỬ",
              key: "/dashboard/SampleTestPage",
              icon: <BookOutlined />,
            },
            {
              label: "QUẢN LÍ SLOT HỌC",
              key: "/dashboard/Slot",
              icon: <UserOutlined />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default Sidebar;