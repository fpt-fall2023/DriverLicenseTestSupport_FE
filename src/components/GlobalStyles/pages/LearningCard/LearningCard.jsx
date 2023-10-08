import { Col, Image, Row } from 'antd';

import LearningCss from './Learning.module.css';

import { useState } from 'react';

const LearningCard = (question) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const ansTypical = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 't', 'q'];
  return (
    <Row className={LearningCss.cardQuestionContainer} justify="space-between">
      <Col
        className={[
          LearningCss.studyModeCard,
          LearningCss.cardQuestion,
          `card ${isFlipped ? 'flip' : ''}`,
        ]}
        onClick={handleFlip}
        span={14}
      >
        <div className="front">
          <div
            style={{ marginBottom: '1.25rem' }}
            className={LearningCss.cardQuestionText}
          >
            {question.question.question}
          </div>
          <div>
            <span className={LearningCss.cardQuestionText}>Select One:</span>
            <ul className={LearningCss.cardQuestionText}>
              {question.question.options.map((ques, index) => {
                return (
                  <li key={index}>
                    {ansTypical[index]}. {ques}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <h1 className="back" style={{ fontSize: '1.6rem' }}>
          {question.question.ans}
        </h1>
      </Col>

      <Col className={LearningCss.cardQuestionImg} span={8}>
        {question.question.image ? (
          <Image movable={'false'} width={250} src={question.question.image} />
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
};

export default LearningCard;
