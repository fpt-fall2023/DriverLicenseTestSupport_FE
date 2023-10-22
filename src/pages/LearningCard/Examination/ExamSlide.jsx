import { Col, Image, Row } from 'antd';

import LearningCss from '../Learning.module.css';
import FullScreenCss from '../FullScreen.module.css';
import { useState } from 'react';

const ExamSlide = (question) => {
  const [currentSelected, setCurrentSelected] = useState();
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
    <Row
      id={`refTo_${question.questionIndex}`}
      style={{ padding: '0 1rem 1rem' }}
      className={LearningCss.questionSlideContainer}
    >
      <Col span={24}>
        <h3 className={FullScreenCss.titleInfoText} style={{ opacity: '0.8' }}>
          <span>Thuật ngữ</span>
          <span>
            {question.questionIndex + 1}/{question.examLength}
          </span>
        </h3>
        <div className={FullScreenCss.questionTitleText}>
          {questionInfo.questionName}
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          {questionInfo.questionImage ? (
            <Image
              movable={'false'}
              width={100}
              preview={false}
              src={questionInfo.questionImage}
            />
          ) : (
            ''
          )}
        </div>
        <div
          className={FullScreenCss.titleInfoText}
          style={{ margin: '2.4rem 0px 1.4rem' }}
        >
          Chọn {multipleChoice() ? 'nhiều' : ''} định nghĩa đúng:
        </div>
        <div className={FullScreenCss.selectAnswerBox}>
          <Row
            justify={'space-between'}
            style={{ rowGap: '0.875rem' }}
            className={FullScreenCss.questionTitleText}
          >
            {questionInfo.answers.map((ques, index) => {
              return (
                <Col
                  key={index}
                  className={[
                    FullScreenCss.selectAnsCard,
                    currentSelected == index ? FullScreenCss.selected : '',
                  ]}
                  span={11}
                  onClick={() => {
                    setCurrentSelected(index);
                    question.handleAnsClick(question.questionIndex, ques);
                  }}
                >
                  {ansTypical[index]}. {ques.answerName}
                </Col>
              );
            })}
          </Row>
        </div>
        {/* <div className={FullScreenCss.selectAnswerBox}>
          <div className={LearningCss.questionSlideText}>
          {questionInfo.answers.map((ques, index) => {
            return (
              <div key={index}>
              {ansTypical[index]}. {ques.answerName}
              </div>
              );
            })}
            </div>
          </div> */}
      </Col>
    </Row>
  );
};

export default ExamSlide;
