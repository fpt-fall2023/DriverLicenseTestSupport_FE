import styles from './AboutUs.module.css'
const AboutUs = () => {
    return (
        <div style={{backgroundColor: "#001529"}}>
            <h1 className={styles.aboutus} >
                Về Chúng Tôi
            </h1>
            <div className={styles.imgBox}>
                <img src="src/assets/images/atgt2021.jpg" alt="aboutus" />
            </div>
            <div className={styles.contentBox}>
                <h3 className={styles.content}>
                    Với sự phát triển của công nghệ thông tin và internet, một website hỗ trợ ôn thi sát hạch lái xe đã ra đời để giải quyết vấn đề này.
                </h3>
                <h3 className={styles.content}>
                    Trang web này cung cấp một nền tảng trực tuyến để học viên có thể ôn tập và chuẩn bị cho bài thi lái xe một cách thuận tiện.
                </h3>
                <h3 className={styles.content}>
                    Trang web hỗ trợ ôn thi lái xe cung cấp nhiều tài liệu học tập, bao gồm các bài thi thực hành và câu hỏi trắc nghiệm về luật giao thông.
                </h3>
                <h3 className={styles.content}>
                    Học sinh có thể truy cập trang web bất cứ lúc nào và ở bất kỳ địa điểm nào có kết nối internet. Họ có thể chọn bài thi để ôn tập và nhận điểm cho bài thi của mình.
                </h3>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}
export default AboutUs