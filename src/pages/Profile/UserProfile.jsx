import { Avatar, Button, Input } from 'antd'
import ProfileSidebar from './ProfileSidebar'
import {UserOutlined} from '@ant-design/icons'
import styles from './UserProfile.module.css'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    return(
        <div className={styles.userProfile}>
            <ProfileSidebar />
            <div className={styles.userProfile__box}>
                <div className={styles.userProfile__content}>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div style={{fontWeight: "bold", fontSize: "1.5rem", marginTop: "1rem"}}>Nguyễn Văn A</div>
                    <div className={styles.userProfile__content__info}>
                        <div className={styles.userProfile__content__info__item}>
                            <span>Email: </span>
                            <span>
                                <Input type="text" disabled />
                            </span>
                        </div>
                        <div className={styles.userProfile__content__info__item}>
                            <span>Số Điện Thoại: </span>
                            <span>
                                <Input type="text" disabled />
                            </span>
                        </div>
                        <div className={styles.userProfile__content__info__item}>
                            <span>Ngày sinh: </span>
                            <span>
                                <Input type="text" disabled />
                            </span>
                        </div>
                        <Link to="/profile/edit"><Button type="primary" style={{marginTop: "1rem"}}>Cập nhật</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile