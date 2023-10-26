import { Col, Image, Row } from 'antd';

import LearningCss from './Learning.module.css';

import { useEffect, useState } from 'react';

const LearningCard = (question) => {
  const questionInfo = question.question;
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  const ansTypical = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 't', 'q'];
  return (
    <Row className={LearningCss.cardQuestionContainer} justify="space-between">
      <Col
        className={[
          LearningCss.studyModeCard,
          LearningCss.cardQuestion,
          `card_3d_note ${isFlipped ? 'flip' : ''}`,
        ]}
        onClick={handleFlip}
        span={14}
      >
        <div className="front">
          <div
            style={{ marginBottom: '1.25rem' }}
            className={LearningCss.cardQuestionText}
          >
            {questionInfo.questionName}
          </div>
          <div>
            <span className={LearningCss.cardQuestionText}>Select One:</span>
            <ul className={LearningCss.cardQuestionText}>
              {questionInfo.answers.map((ques, index) => {
                return (
                  <li key={index}>
                    {ansTypical[index]}. {ques.answerName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <h1 className="back" style={{ fontSize: '1.6rem', fontWeight: 400 }}>
          {questionInfo.answers.map((ques, index) => {
            if (ques.isCorrect) {
              return (
                <div key={index}>
                  {ansTypical[index]}. {ques.answerName}
                </div>
              );
            }
          })}
        </h1>
      </Col>

      <Col className={LearningCss.cardQuestionImg} span={8}>
        {questionInfo.questionImage ? (
          <Image
            movable={'false'}
            width={450}
            preview={false}
            src={questionInfo.questionImage}
          />
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
};

export default LearningCard;
