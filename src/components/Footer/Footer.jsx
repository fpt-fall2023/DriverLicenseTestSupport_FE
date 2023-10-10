import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
    const helpfulLinks = [
        {
            title: 'Trang Chủ',
            link: '/'
        },
        {
            title: 'Quiz',
            link: '/QuizPage'
        },
        {
            title: 'Tin Tức',
            link: '/news'
        },
        {
            title: 'Về Chúng Tôi',
            link: '/about'
        },
    ]

    return (
        <div className={styles.footer}>
            <Row>
                <Col span={10}>
                    <h3>Ôn Tập Lái Xe</h3>
                    <p>Ôn Tập Lái Xe là một trang web giúp người dùng ôn tập lý thuyết lái xe trực tuyến</p>
                </Col>
                <Col span={10}>
                    <h3>Liên Hệ</h3>
                    <p>Số điện thoại: 0123456789</p>
                    <p>Email: OnTapLaiXeTaiNguyen@gmail.com</p>
                </Col>
                <Col span={4}>
                    <h3>Liên Kết</h3>
                    <ul>
                        {helpfulLinks.map((link, index) => (
                            <li key={index}><Link to={link.link}>{link.title}</Link></li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </div>
    )
}
export default Footer