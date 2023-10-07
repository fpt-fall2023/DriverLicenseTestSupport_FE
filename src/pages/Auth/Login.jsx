import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import styles from './Login.module.css'
const Login = () => {
    const [form] = Form.useForm()

    const mainLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }

    return (
        <div className={styles.login}>
            <div>
                <img src='./images/Login_Banner_2.jpg' alt='Login_Banner' className={styles.loginBanner} />
            </div>
            <div className={styles.loginBox}>
                <img src='./images/Website_Logo.png' alt="logo" />
                <div className={styles.loginBox__title}>Welcome to Driver License Test Support</div>
                <div className={styles.loginBox__subtitle}>Drift like a Pro - Gotta Go Fast</div>
                <Form
                    {...mainLayout}
                    form={form}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email" }
                        ]}
                        className={styles.loginBox__formItem}
                    >
                        <Input
                            placeholder='Input your email'
                            className={styles.loginBox__formItem__input}
                            suffix={
                                <UserOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please input your password" }
                        ]}
                    >
                        <Space direction="vertical">
                            <Input.Password
                                placeholder="Input your password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.loginBox__formItem__input}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className={styles.loginBox__button} htmlType='submit'>Login</Button>
                    </Form.Item>
                </Form>
                <div className={styles.loginBox__line}></div>
                <div>
                    Login with Google:
                </div>
                <div>
                    <img src='./images/google.png' alt='google_login' className={styles.loginBox__social} />
                </div>
            </div>
        </div>
    )
}

export default Login