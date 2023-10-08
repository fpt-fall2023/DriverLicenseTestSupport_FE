// import React from "react";
import { useState } from 'react';
import { Button, Col, Progress, Row, Tooltip } from 'antd';

import LearningCss from './Learning.module.css';
import './Flip.css';

import flashCardIcon from '../../assets/icons/flash-card.png';
import fileTestIcon from '../../assets/icons/word.png';
import learningIcon from '../../assets/icons/learning.png';
import matchingPuzzleIcon from '../../assets/icons/puzzle.png';
import shuffleIcon from '../../assets/icons/shuffle.png';
import startIcon from '../../assets/icons/play.png';
import fullScreenIcon from '../../assets/icons/fullScreen.png';
import nextQuesIcon from '../../assets/icons/navigate_next.png';
import prevQuesIcon from '../../assets/icons/navigate_before.png';

import LearningCard from './LearningCard';

const rawQuestion = [
  {
    id: 1,
    question:
      'Biển báo hiệu hình chữ nhật hoặc hình vuông hoặc hình mũi tên nền xanh lam là loại biển gì dưới đây ?',
    ans: 'Biển báo chỉ dẫn',
    options: [
      'Biển báo nguy hiểm',
      'Biển báo cấm',
      'Biển báo hiệu lệnh phải thi hành',
      'Biển báo chỉ dẫn',
    ],
    image:
      'https://hondamydinh.com.vn/wp-content/uploads/2021/07/Logo-bie%CC%82%CC%89n-ba%CC%81o-chi%CC%89-da%CC%82%CC%83n.jpeg',
  },
  {
    id: 2,
    question: 'Khi lùi xe người lái xe phải làm gì để đảm bảo an toàn ?',
    ans: 'Phải quan sát phía sau, có tín hiệu cần thiết và chỉ nào thấy không nguy hiểm mới được lùi',
    options: [
      'Quan sát phía trước và cho lùi xe ở tốc độ chậm',
      'Lợi dụng nơi đường giao nhau đủ chiều rộng để lùi',
      'Phải quan sát phía sau, có tín hiệu cần thiết và chỉ nào thấy không nguy hiểm mới được lùi',
    ],
    image: null,
  },
];

const Learning = () => {
  const [curQues, setCurQues] = useState(0);

  const handleNextQues = () => {
    if (curQues < rawQuestion.length - 1) {
      setCurQues(curQues + 1);
    }
  };

  const handlePrevQues = () => {
    if (curQues > 0) {
      setCurQues(curQues - 1);
    }
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
        <LearningCard question={rawQuestion[curQues]} />

        {/* Navigate Section------------------------------------------- */}
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
                  onClick={handlePrevQues}
                  icon={<img src={prevQuesIcon} alt="Prev Question" />}
                />
                <span style={{ margin: '0 1rem' }}>1/258</span>
                <Button
                  title="Search"
                  shape="circle"
                  size="large"
                  onClick={handleNextQues}
                  icon={<img src={nextQuesIcon} alt="Next Question" />}
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
            <div className="progressBar">
              <Progress
                percent={((curQues + 1) / rawQuestion.length) * 100}
                size="small"
                status="active"
                showInfo={false}
              />
            </div>
          </Col>
        </Row>
      </div>
      {/* Post Publisher------------------------------- */}
      <div></div>
      <div style={{ padding: '80px 0' }}></div>
    </div>
  );
};

export default Learning;
