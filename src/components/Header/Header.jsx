import { Col, Row } from 'antd'
import Button from 'antd/lib/button/button'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div id='header' className={styles.header}>
            <img src='src/assets/images/Website_Logo.png' alt='logo' className={styles.logo} />
            <div className={styles.centerName}>Ôn Tập Lái Xe</div>
            <Row className={styles.header__section}>
                <Col span={6}>
                    <Link to='/'>
                        Trang Chủ
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to='/QuizPage'>
                        Quiz
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to='/news'>
                        Tin Tức
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to='/about'>
                        Về Chúng Tôi
                    </Link>
                </Col>
            </Row>
            <div>
                <Link to='/login'>
                    <Button type='primary'>Đăng Nhập</Button>
                </Link>
            </div>
        </div>
    )
}
export default Header