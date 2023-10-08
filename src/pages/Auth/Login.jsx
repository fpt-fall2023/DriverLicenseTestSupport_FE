import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Login = () => {
    const [form] = Form.useForm()

    const mainLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }

    const onFinish = (values) => {
        console.log(values)
    }

    // useEffect (() => {
    //     document.getElementById('header').style.display = 'none'
    // }, [])

    return (
        <div className={styles.login}>
            <div>
                <img src='src/assets/images/Login_Banner.jpg' alt='Login_Banner' className={styles.loginBanner} />
            </div>
            <div className={styles.loginBox}>
                <img src='src/assets/images/Website_Logo.png' alt="logo" className={styles.websiteLogo} />
                <div className={styles.loginBox__title}>Chào Mừng Tới Ôn Tập Lái Xe</div>
                <div className={styles.loginBox__subtitle}>Đồng hành cùng bạn trên con đường an toàn</div>
                <Form
                    {...mainLayout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Nhập email của bạn" }
                        ]}
                        className={styles.loginBox__formItem}
                    >
                        <Input
                            placeholder='Nhập email của bạn'
                            className={styles.loginBox__formItem__input}
                            suffix={
                                <MailOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Nhập password của bạn" }
                        ]}
                    >
                        <Space direction="vertical">
                            <Input.Password
                                placeholder="Nhập password của bạn"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.loginBox__formItem__input}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className={styles.loginBox__button} htmlType='submit'>Đăng Nhập</Button>
                    </Form.Item>
                </Form>
                <div className={styles.loginBox__line}></div>
                <div style={{fontWeight: "bold"}}>
                    Đăng Nhập Bằng Google:
                </div>
                <div>
                    <img src='src/assets/images/google.png' alt='google_login' className={styles.loginBox__social} />
                </div>
                <div className={styles.loginBox__line}></div>
                <div style={{fontWeight: "bold"}}>
                    Chưa có tài khoản? <Link to='/register' style={{textDecoration: "none", color: "#1677ff"}}>Đăng ký Ngay</Link>
                </div>
            </div>
        </div>
    )
}

export default Login