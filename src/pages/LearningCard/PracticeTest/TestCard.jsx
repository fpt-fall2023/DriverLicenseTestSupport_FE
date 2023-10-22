import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

import QuestionModuleCss from '../Learning.module.css';

const TestCard = () => {
  return (
    <Card
      title="Đề 1"
      bordered={false}
      style={{
        width: 280,
        border: '1px solid #F6F7FB',
        boxShadow: '0 0 0.5rem 0.2rem #2e385614',
      }}
    >
      <div className={QuestionModuleCss.testCardHeader}>32 thuật ngữ</div>
      <div>
        <Meta
          style={{ alignItems: 'center', margin: 0 }}
          avatar={
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-BpZdakJzOM3jIQS6bHnLsno7NhozyDmCA&usqp=CAU" />
          }
          title="Yami"
          description="Đội trưởng đội báo"
        />
      </div>
    </Card>
  );
};

export default TestCard;
