import { Button, Card } from 'antd';

import QuestionModuleCss from '../Learning.module.css';
import { useNavigate } from 'react-router-dom';

const TestCard = (data) => {
  const navigate = useNavigate();
  const testInfo = data.data;

  const navigateToExam = (data) => {
    navigate('/quizPage/examination', { state: { questionBankId: data } });
  };
  return (
    <Card
      title={testInfo.testName}
      bordered={false}
      style={{
        width: 240,
        border: '1px solid #F6F7FB',
        boxShadow: '0 0 0.5rem 0.2rem #2e385614',
      }}
    >
      <div className={QuestionModuleCss.testCardHeader}>
        <span className={QuestionModuleCss.testCardQuestions}>
          {testInfo.testType == 'B1' ? '30' : '35'} thuật ngữ
        </span>
        <span>
          <Button
            onClick={() => navigateToExam(testInfo.questionBank)}
            type="primary"
            size={'middle'}
          >
            Thi Thử
          </Button>
        </span>
      </div>
    </Card>
  );
};

export default TestCard;
