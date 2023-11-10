import { Avatar, Button, Input } from 'antd'
import ProfileSidebar from './ProfileSidebar'
import {UserOutlined} from '@ant-design/icons'
import styles from './UserProfile.module.css'
import { Link } from 'react-router-dom'
const UserProfile = () => {

const user = JSON.parse(localStorage.getItem('user'));    
    return(
        <div className={styles.userProfile}>
            <ProfileSidebar />
            <div className={styles.userProfile__box}>
                <div className={styles.userProfile__content}>
                <div className={styles.editProfile__box__title}>
                        <UserOutlined />
                        <span style={{ marginLeft: "1rem" }}>Thông Tin Cá Nhân</span>
                    </div>
                    <Avatar shape='square' size={100} style={{marginTop:'30px', height:'140px'}}
                     icon={<img src={user.avatar} />}
                     />
                    <div style={{fontWeight: "bold", fontSize: "1.5rem", marginTop: "1rem"}}>{user.name}</div>
                    <div className={styles.userProfile__content__info}>
                        <div className={styles.userProfile__content__info__item}>
                            <span>Email: </span>
                            <span>
                                <Input type="text" disabled value={user.name} />
                            </span>
                        </div>
                        <div className={styles.userProfile__content__info__item}>
                            <span>Số Điện Thoại: </span>
                            <span>
                                <Input type="text" disabled value={user.phone} />
                            </span>
                        </div>
                        {/* <div className={styles.userProfile__content__info__item}>
                            <span>Ngày sinh: </span>
                            <span>
                                <Input type="text" disabled />
                            </span>
                        </div> */}
                        <Link to="/profile/edit"><Button type="primary" style={{marginTop: "1rem"}}>Cập nhật</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile