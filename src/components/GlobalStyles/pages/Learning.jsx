// import React from "react";
// import './Flip.css';

import LearningCss from './Learning.module.css';
import flashCardIcon from '../assets/icons/flash-card.png';
import fileTestIcon from '../assets/icons/word.png';
import learningIcon from '../assets/icons/learning.png';
import matchingPuzzleIcon from '../assets/icons/puzzle.png';
import shuffleIcon from '../assets/icons/shuffle.png';
import startIcon from '../assets/icons/play.png';
import fullScreenIcon from '../assets/icons/fullScreen.png';
import nextQuesIcon from '../assets/icons/navigate_next.png';
import prevQuesIcon from '../assets/icons/navigate_before.png';

import questionImage from '../assets/images/bienBaoChiDan.png';

import { useState } from 'react';
import { Button, Col, Image, Row, Tooltip } from 'antd';

// const rawQuestion = [
//   {
//     id: 1,
//     question:
//       'Biển báo hiệu hình chữ nhật hoặc hình vuông hoặc hình mũi tên nền xanh lam là loại biển gì dưới đây ?',
//     ans: 'Biển báo chỉ dẫn',
//     options: [
//       'Biển báo nguy hiểm',
//       'Biển báo cấm',
//       'Biển báo hiệu lệnh phải thi hành',
//       'Biển báo chỉ dẫn',
//     ],
//   },
//   {
//     id: 2,
//     question: 'Khi lùi xe người lái xe phải làm gì để đảm bảo an toàn ?',
//     ans: 'Phải quan sát phía sau, có tín hiệu cần thiết và chỉ nào thấy không nguy hiểm mới được lùi',
//     options: [
//       'Quan sát phía trước và cho lùi xe ở tốc độ chậm',
//       'Lợi dụng nơi đường giao nhau đủ chiều rộng để lùi',
//       'Phải quan sát phía sau, có tín hiệu cần thiết và chỉ nào thấy không nguy hiểm mới được lùi',
//     ],
//   },
// ];

const Learning = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={LearningCss.learningContainer}>
      <div className="learningHeader">
        <h2 className={LearningCss.learningPageTitle}>PRM391</h2>

        <Row
          style={{ marginRight: '10px' }}
          className={LearningCss.studyModeNavList}
        >
          <Col
            className={[
              LearningCss.studyModeNavItem,
              LearningCss.studyModeCard,
            ]}
            span={5}
          >
            <img className={LearningCss.studyModeNavIcon} src={flashCardIcon} />
            <span>Thẻ ghi nhớ</span>
          </Col>
          <Col
            className={[
              LearningCss.studyModeNavItem,
              LearningCss.studyModeCard,
            ]}
            span={5}
          >
            <img className={LearningCss.studyModeNavIcon} src={fileTestIcon} />
            <span>Học</span>
          </Col>
          <Col
            className={[
              LearningCss.studyModeNavItem,
              LearningCss.studyModeCard,
            ]}
            span={5}
          >
            <img className={LearningCss.studyModeNavIcon} src={learningIcon} />
            <span>Kiểm tra</span>
          </Col>
          <Col
            className={[
              LearningCss.studyModeNavItem,
              LearningCss.studyModeCard,
            ]}
            span={5}
          >
            <img
              className={LearningCss.studyModeNavIcon}
              src={matchingPuzzleIcon}
            />
            <span>Ghép thẻ</span>
          </Col>
        </Row>
      </div>

      <div className={LearningCss.learningCardSection}>
        {/* <div> */}
        <Row
          className={LearningCss.cardQuestionContainer}
          justify="space-between"
        >
          <Col
            className={[LearningCss.studyModeCard, LearningCss.cardQuestion]}
            span={14}
          >
            <div
              className={`card ${isFlipped ? 'flipped' : ''}`}
              onClick={handleFlip}
            >
              <Row className={[LearningCss.questionContent]}>
                <div className="card-front">
                  <div
                    style={{ marginBottom: '1.25rem' }}
                    className={LearningCss.cardQuestionText}
                  >
                    What is not a service?
                  </div>
                  <div>
                    <span className={LearningCss.cardQuestionText}>
                      Select One:
                    </span>
                    <ul className={LearningCss.cardQuestionText}>
                      <li>
                        a. Intercept the events from a user's interaction with
                        your application
                      </li>
                      <li>
                        b. Like an activity, it has lifecycle methods that you
                        can implement to monitor changes in its state.
                      </li>
                      <li>
                        c. It is a program that can run in the background for an
                        indefinite period
                      </li>
                      <li>
                        d. Service is another building block of android
                        application it does not provide a UI
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-front">D</div>
              </Row>
            </div>
          </Col>

          <Col className={LearningCss.cardQuestionImg} span={8}>
            <Image movable={false} width={250} src={questionImage} />
          </Col>
        </Row>
        {/* </div> */}

        {/* <div className="cardNavigation"> */}
        <Row justify={'space-between'}>
          <Col span={14} className="navigation">
            <Row>
              <Col className={LearningCss.firstAction} span={8}>
                <Tooltip title="Start">
                  <Button
                    style={{ marginRight: '10px' }}
                    title="Search"
                    shape="circle"
                    icon={<img src={startIcon} alt="Start" />}
                  />
                </Tooltip>
                <Tooltip title="Shuffle">
                  <Button
                    title="Search"
                    shape="circle"
                    icon={<img src={shuffleIcon} alt="Shuffle" />}
                  />
                </Tooltip>
              </Col>

              <Col className={LearningCss.secondAction} span={8}>
                <Button
                  title="Search"
                  shape="circle"
                  size="large"
                  icon={<img src={prevQuesIcon} alt="Full Screen" />}
                />
                <span style={{ margin: '0 1rem' }}>1/258</span>
                <Button
                  title="Search"
                  shape="circle"
                  size="large"
                  icon={<img src={nextQuesIcon} alt="Full Screen" />}
                />
              </Col>

              <Col className={LearningCss.thirdAction} span={8}>
                <Tooltip title="Full Screen">
                  <Button
                    title="Search"
                    shape="circle"
                    icon={<img src={fullScreenIcon} alt="Full Screen" />}
                  />
                </Tooltip>
              </Col>
            </Row>
            <div className="progressBar"></div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Learning;
