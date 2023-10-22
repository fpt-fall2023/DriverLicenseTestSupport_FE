import { Avatar, Button, Input } from 'antd'
import ProfileSidebar from './ProfileSidebar'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './UserProfile.module.css'
const EditProfile = () => {
    return (
        <div className={styles.userProfile}>
            <ProfileSidebar />
            <div className={styles.editProfile__box}>
                <div className={styles.editProfile__box__mainprofile}>
                    <div className={styles.editProfile__box__title}>
                        <UserOutlined />
                        <span style={{ marginLeft: "1rem" }}>Thông Tin Cá Nhân</span>
                    </div>
                    <div className={styles.editProfile__box__inputbox}>
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Họ và tên" />
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Email" />
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Số điện thoại" />
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Ngày sinh" />
                        <Button type="primary" className={styles.editProfile__box__inputbox__button} >Cập nhật</Button>
                    </div>
                </div>
                <div className={styles.editProfile__box__changepassword}>
                    <div className={styles.editProfile__box__title}>
                        <LockOutlined />
                        <span style={{ marginLeft: "1rem" }}>Đổi Mật Khẩu</span>
                    </div>
                    <div className={styles.editProfile__box__inputbox}>
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Mật khẩu cũ" />
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Mật khẩu mới" />
                        <Input className={styles.editProfile__box__inputbox__item} placeholder="Nhập lại mật khẩu mới" />
                        <Button type="primary" className={styles.editProfile__box__inputbox__button} >Đổi Mật Khẩu</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile