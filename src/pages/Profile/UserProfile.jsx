import ProfileSidebar from "./ProfileSidebar"
import styles from './UserProfile.module.css'

const UserProfile = () => {
    return(
        <div className={styles.userProfile}>
            <ProfileSidebar />
            <div className="userProfile__content">
            </div>
        </div>
    )
}

export default UserProfile