import {UserOutlined, EditOutlined, SafetyOutlined} from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

const ProfileSidebar = () => {
    const navigate = useNavigate()
    const items = [
        {
            label: 'Hồ sơ của tôi',
            key: 'profile',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile')
        },
        {
            label: 'Chỉnh sửa hồ sơ',
            key: 'edit_profile',
            icon: <EditOutlined />,
            onClick: () => navigate('/profile/edit')
        },
        {
            label: 'Đổi mật khẩu',
            key: 'change_password',
            icon: <SafetyOutlined />,
            onClick: () => navigate('/profile/change-password')
        },
    ]

    return(
        <div>
            <Menu mode="inline" defaultSelectedKeys={['profile']}>
                {items.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    )
}
export default ProfileSidebar