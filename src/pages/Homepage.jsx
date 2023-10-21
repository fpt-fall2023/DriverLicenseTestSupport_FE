import styles from './Test.module.css';
import { Typography, Button, Row, Col, Divider, Card } from 'antd';
import driving_theory from '../assets/images/driving_theory.jpg';
import practice_b2 from '../assets/images/practice_b2.png';

const { Title } = Typography;
const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <div>
        <Row className={styles.main_container} id="#">
          <Col span={18} className="homepagebody1__right-site">
            <Title level={1} style={{ fontWeight: 'bolder', color: 'white' }}>
              Ôn thi lý thuyết bằng lái ôtô B2, B1 mới nhất 2022
            </Title>
            <Typography.Paragraph style={{ fontSize: 18, color: 'white' }}>
              Hãy để chúng tôi giúp bạn củng cố kiến thức trong thời gian ngắn
              nhất
            </Typography.Paragraph>
            <a href="quizpage">
              <Button
                className="home1_button"
                type="primary"
                style={{
                  backgroundColor: '#4255FF',
                  color: 'white',
                  fontWeight: 'bolder',
                  width: '118px',
                }}
              >
                Bắt đầu nào!
              </Button>
            </a>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={18} className="homepagebody1__right-site">
            <Title
              level={2}
              style={{
                fontWeight: 'bolder',
                color: '#2E3856',
                marginLeft: '55%',
              }}
            >
              Các bước thực hiện
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={5} style={{ marginLeft: '20%' }}>
            <Card style={{ width: 300, height: 200 }}>
              <Title
                level={3}
                style={{ fontWeight: 'bolder', color: '#0088FF' }}
              >
                Đăng ký tài khoản
              </Title>
              <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
                Đăng ký tài khoản để có thể sử dụng các chức năng của trang web
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col span={5}>
            <Card style={{ width: 300, height: 200 }}>
              <Title
                level={3}
                style={{ fontWeight: 'bolder', color: '#0088FF' }}
              >
                Học lý thuyết
              </Title>
              <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
                Học lý thuyết để củng cố kiến thức của bạn
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col span={5}>
            <Card style={{ width: 300, height: 200 }}>
              <Title
                level={3}
                style={{ fontWeight: 'bolder', color: '#0088FF' }}
              >
                Làm bài thi
              </Title>
              <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
                Làm bài thi để kiểm tra kiến thức của bạn
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={8} style={{ marginLeft: '20%' }}>
            <Title
              level={1}
              style={{
                fontWeight: 'bolder',
                color: '#2E3856',
              }}
            >
              Tại sao nên học B2 ?
            </Title>
            <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
              Hợp pháp lái xe: Trình độ B2 ô tô là mức độ pháp lý để lái xe ô tô
              trong nhiều quốc gia. Nắm vững kiến thức và kỹ năng lái xe B2 sẽ
              giúp bạn tuân thủ quy định giao thông và tránh vi phạm pháp luật.
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
              An toàn giao thông: Học B2 ô tô giúp bạn hiểu rõ về các quy tắc an
              toàn giao thông, kỹ thuật lái xe và kỹ năng phản ứng trong các
              tình huống nguy hiểm. Điều này giúp tăng cường an toàn cho bạn và
              những người tham gia giao thông xung quanh.
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontSize: 18, color: 'black' }}>
              Mở rộng cơ hội việc làm: Trình độ B2 ô tô cũng mở ra nhiều cơ hội
              việc làm trong lĩnh vực lái xe, như lái taxi, lái xe tải, hoặc
              công việc liên quan đến vận tải và giao thông.
            </Typography.Paragraph>
          </Col>
          <Col span={8}>
            <img
              src={driving_theory}
              alt="img"
              style={{
                height: '420px',
                width: '500px',
                marginLeft: '50px',
                borderRadius: '10px',
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Title
            level={1}
            style={{
              fontWeight: 'bolder',
              color: '#2E3856',
              margin: 'auto',
            }}
          >
            Quy trình học thực hành B2 ?
          </Title>
        </Row>
        <Row>
          <img
            src={practice_b2}
            alt="img"
            style={{
              height: '660px',
              width: '1300px',
              margin: 'auto',
              padding: '20px',
            }}
          />
        </Row>
      </div>
    </div>
  );
};

export default Homepage;
