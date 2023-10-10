import {
    AppstoreOutlined,
    UserOutlined,
    QuestionOutlined
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
              icon: <UserOutlined />,
            },
            {
              label: "QUẢN LÍ CÂU HỎI",
              key: "/dashboard/QuestionPage",
              icon: <QuestionOutlined />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default Sidebar;