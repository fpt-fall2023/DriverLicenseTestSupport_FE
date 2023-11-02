import { Col, Divider, Image, Row } from 'antd';

import LearningCss from './Learning.module.css';

const QuestionSlide = (question) => {
  const questionInfo = question.question;
  const ansTypical = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 't', 'q'];
  const multipleChoice = () => {
    let count = 0;
    questionInfo.answers.map((ques) => {
      if (ques.isCorrect) count += 1;
    });
    if (count >= 2) {
      return true;
    }
    return false;
  };
  return (
    <Row className={LearningCss.questionSlideContainer}>
      <Col span={14}>
        <div className={LearningCss.questionSlideText}>
          {questionInfo.questionName}
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          {questionInfo.questionImage ? (
            <Image
              movable={'false'}
              width={350}
              preview={false}
              src={questionInfo.questionImage}
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <span className={LearningCss.questionSlideText}>
            Select {multipleChoice() ? 'Many' : 'One'}:
          </span>
          <div className={LearningCss.questionSlideText}>
            {questionInfo.answers.map((ques, index) => {
              return (
                <div key={index}>
                  {ansTypical[index]}. {ques.answerName}
                </div>
              );
            })}
          </div>
        </div>
      </Col>
      <Divider style={{ height: 'auto' }} type="vertical" />
      <Col className={LearningCss.questionSlideText} span={9}>
        {questionInfo.answers.map((ques, index) => {
          if (ques.isCorrect) {
            return (
              <div key={index}>
                {ansTypical[index]}. {ques.answerName}
              </div>
            );
          }
        })}
      </Col>
    </Row>
  );
};

export default QuestionSlide;
