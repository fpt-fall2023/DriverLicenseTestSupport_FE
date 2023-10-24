import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Form, Input, Space, notification } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerAccount } from '../../apis/UserService'
import { useEffect } from 'react'
const Register = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const mainLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }

    const onFinish = (values) => {
        registerAccount(values.email, values.password, values.fullname).then(res => {
            if(res.status === 201) {
                notification.success({
                    message: 'Đăng ký thành công',
                    placement: 'bottomRight'
                })
                navigate('/')
            }
        }).catch(err => {
            console.log(err)
            notification.error({
                message: 'Đăng ký thất bại. Vui lòng thử lại',
                placement: 'bottomRight'
            })
        })
    }

    useEffect(() => {
        if(localStorage.getItem('token')?.length > 0) {
            window.location.href = '/'
        }
    }, [])

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
                        name="fullname"
                        rules={[
                            { required: true, message: "Nhập họ tên của bạn" }
                        ]}
                        className={styles.loginBox__formItem}
                    >
                        <Input
                            placeholder='Nhập họ tên của bạn'
                            className={styles.loginBox__formItem__input}
                            suffix={
                                <UserOutlined />
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
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập lại password của bạn"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className={styles.loginBox__formItem__input}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className={styles.loginBox__button} htmlType='submit'>Đăng Ký</Button>
                    </Form.Item>
                </Form>
                <div className={styles.loginBox__line}></div>
                <div style={{ fontWeight: "bold" }}>
                    Đăng Ký Bằng Google:
                </div>
                <div>
                    <img src='src/assets/images/google.png' alt='google_login' className={styles.loginBox__social} />
                </div>
                <div className={styles.loginBox__line}></div>
                <div style={{ fontWeight: "bold" }}>
                    Đã có tài khoản? <Link to='/login' style={{ textDecoration: "none", color: "#1677ff" }}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    )
}

export default Register