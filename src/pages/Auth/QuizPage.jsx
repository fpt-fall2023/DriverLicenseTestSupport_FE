import Meta from "antd/es/card/Meta";
import styles from "../Test.module.css";
import { Divider, Row, Typography, Card, Col, List } from "antd";
const { Title, Text } = Typography;
const QuizPage = () => {
  return (
    <div className={styles.quizpage}>
      <div>
        <Row className={styles.main_container} id="#">
          <Col span={18}>
            <Title level={1} style={{ fontWeight: "bolder", color: "white" }}>
              Ôn thi lý thuyết bằng lái ôtô B2, B1 mới nhất 2023
            </Title>
            <Typography.Paragraph style={{ fontSize: "18px", color: "white" }}>
              Hãy để chúng tôi giúp bạn củng cố kiến thức trong thời gian ngắn
              nhất
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
      <Divider />
      <Row>
        <Col span={16} style={{ marginLeft: "20%" }}>
          <Title
            level={2}
            style={{
              fontWeight: "bolder",
              color: "#2E3856",
            }}
          >
            Cấu trúc đề thi lý thuyết
          </Title>
          <Typography.Text style={{ fontSize: "18px", color: "black" }}>
            Dựa theo cấu trúc đề thi lý thuyết B2 chính thức thì mỗi đề thi sát
            hạch lý thuyết B2 sẽ bao gồm:
            <Text italic style={{ fontSize: "18px" }}>
              {" "}
              1 câu hỏi phần khái niệm; 7 câu hỏi về quy tắc giao thông; 1 câu
              hỏi nghiệp vụ vận tải; 1 câu về tốc độ khoảng cách; 1 câu hỏi về
              văn hóa & đạo đức người lái xe; 2 câu hỏi về kỹ thuật lái xe; 1
              câu hỏi về cấu tạo sửa chữa; 10 câu hỏi biển báo; 10 câu hỏi sa
              hình kèm theo 1 câu hỏi điểm liệt (tình huống gây mất an toàn giao
              thông nghiêm trọng)
            </Text>
            . Học viên ôn tập cần đáp án ứng yêu cầu sau:
          </Typography.Text>
          <Typography.Text>
            <List>
              <List.Item>
                <Text strong style={{ fontSize: "18px" }}>
                  Số câu hỏi phải đúng:
                </Text>{" "}
                <Text strong style={{ color: "red", fontSize: "18px" }}>
                  32/35 câu trở lên là đậu.
                </Text>
              </List.Item>
              <List.Item>
                <Text strong style={{ fontSize: "18px" }}>
                  Thời gian làm đề thi:
                </Text>{" "}
                <Text strong style={{ color: "red", fontSize: "18px" }}>
                  22 phút.
                </Text>
              </List.Item>
              <List.Item>
                <Text strong style={{ fontSize: "18px" }}>
                  Yêu cầu đặc biệt:
                </Text>{" "}
                <Text strong style={{ color: "red", fontSize: "18px" }}>
                  KHÔNG LÀM SAI CÂU ĐIỂM LIỆT (câu hỏi *)
                </Text>
              </List.Item>
            </List>
          </Typography.Text>

          <Typography.Paragraph style={{ fontSize: 18, color: "black" }}>
            <p>
              <strong>Lưu ý:</strong> Bộ đề thi bằng lái xe B2 này được xây dựng
              theo tài liệu 600 câu hỏi thi ô tô Tổng Cục Đường Bộ VN ban hành.
              Nếu học thuộc hết 18 đề thi thử bằng lái xe B2 này đồng nghĩa với
              việc bạn sẽ nắm chắc việc thi đậu lý thuyết 100% mà không cần phải
              lo lắng.
            </p>
            <p>
              Hãy chọn một trong 18 đề để bắt đầu thi. Mỗi câu hỏi có thể có
              nhiều hơn một đáp án đúng.
            </p>
          </Typography.Paragraph>
        </Col>
      </Row>
      <Divider />
      <div>
        <Row gutter={40} style={{ marginLeft: "25%", marginBottom: "30px" }}>
          <Col span={5}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              bordered={false}
              cover={
                <img
                  alt="example"
                  src="https://daotaolaixeoto.com.vn/Images/ontap/hoc.png"
                />
              }
            >
              <Meta title="Ôn lý thuyết" />
            </Card>
          </Col>
          <Col span={5}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              bordered={false}
              cover={
                <img
                  alt="example"
                  src="https://daotaolaixeoto.com.vn/Images/ontap/bien-bao.png"
                />
              }
            >
              <Meta title="Biến báo" />
            </Card>
          </Col>
          <Col span={5}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              bordered={false}
              cover={
                <img
                  alt="example"
                  src="https://daotaolaixeoto.com.vn/Images/ontap/tra-cuu-luat.png"
                />
              }
            >
              <Meta title="Tra cứu luật" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default QuizPage;