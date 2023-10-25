import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Trang không tồn tại."
                extra={<Link to="/"><Button type="primary">Quay về trang chủ</Button></Link>}
            />
        </div>
    )
}
export default ErrorPage