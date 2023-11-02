import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';

const QuestionBankDetail = () => {
  const questionDetail = useLocation().state;

  return (
    <div style={{ padding: '30px', font: ' 15px Arial, sans-serif' }}>
      <Link to="/dashboard/QuestionBankPage">
        <Button type="primary">Quay Về</Button>
      </Link>
      <h1 style={{ textAlign: 'center' }}>
        {questionDetail.questionBankName} - Loại Đề: {questionDetail.driveType}
      </h1>
      <div>
        {questionDetail.question.map((question, index) => {
          return (
            <div
              key={index}
              style={{
                border: '1px solid #717171',
                margin: '10px 0 10px 0 ',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <h3>
                Câu {index + 1}: {question.questionName}
              </h3>
              {question.answers.map((answer, index) => {
                return (
                  <div key={index}>
                    <p>{answer.answerName}</p>
                  </div>
                );
              })}
              <div>
                <span>
                  <span style={{ fontWeight: 'bold' }}>Đáp án đúng: </span>
                  {question.answers
                    .filter((answer) => answer.isCorrect === true)
                    .map((answer) => answer.answerName)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBankDetail;
