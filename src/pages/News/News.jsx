import bien_bao from '../../assets/images/bien_bao.png';
import bien_bao2 from '../../assets/images/bien_bao_con_lai.png';
import { Divider, Row } from 'antd';

const News = () => {
  return (
    <div>
      <Row>
        <img
          src={bien_bao}
          alt="img"
          style={{
            height: 'max-content',
            width: '1500px',
            margin: 'auto',
          }}
        />
        <img
          src={bien_bao2}
          alt="img"
          style={{
            height: 'max-content',
            width: '1500px',
            margin: 'auto',
          }}
        />
      </Row>
      <Divider />
    </div>
  );
};
export default News;
