import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
    return(
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
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/QuizPage">Quiz</Link></li>
                        <li><Link to="/news">Tin Tức</Link></li>
                        <li><Link to="/about">Về Chúng Tôi</Link></li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}
export default Footer