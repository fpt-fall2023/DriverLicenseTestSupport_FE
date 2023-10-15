import { Col, Divider, Image, Row } from 'antd';

import LearningCss from './Learning.module.css';

const QuestionSlide = (question) => {
  const ansTypical = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 't', 'q'];

  return (
    <Row className={LearningCss.questionSlideContainer}>
      <Col span={14}>
        <div className={LearningCss.questionSlideText}>
          {question.question.question}
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          {question.question.image ? (
            <Image
              movable={'false'}
              width={100}
              preview={false}
              src={question.question.image}
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <span className={LearningCss.questionSlideText}>
            Select {question.question.ans.length == 1 ? 'One' : 'Many'}:
          </span>
          <div className={LearningCss.questionSlideText}>
            {question.question.options.map((ques, index) => {
              return (
                <div key={index}>
                  {ansTypical[index]}. {ques}
                </div>
              );
            })}
          </div>
        </div>
      </Col>
      <Divider style={{ height: 'auto' }} type="vertical" />
      <Col className={LearningCss.questionSlideText} span={9}>
        {question.question.ans}
      </Col>
    </Row>
  );
};

export default QuestionSlide;
