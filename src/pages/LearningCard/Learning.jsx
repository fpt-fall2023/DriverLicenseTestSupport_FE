// import React from "react";
import { useEffect, useState } from 'react';
import { Avatar, Button, Col, Progress, Row, Tooltip } from 'antd';

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
import shareCourseIcon from '../../assets/icons/ios_share.png';
import duplicateIcon from '../../assets/icons/content_copy.png';
import moreItemsIcon from '../../assets/icons/more_horiz.png';

import LearningCard from './LearningCard';
import QuestionSlide from './QuestionSlide';

import { getQuestions } from '../../apis/QuestionService';
import { LoadingOutlined } from '@ant-design/icons';

const Learning = () => {
  const [questions, setQuestions] = useState([]);
  const [curQues, setCurQues] = useState(0);
  // const [paginationQues, setPaginationQues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getQuestions();
        setQuestions(result.data.data.Question);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleNextQues = () => {
    if (curQues < questions.length - 1) {
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
        <div className={LearningCss.learningPageTitle}>Câu hỏi lái xe</div>

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
      {questions.length > 0 ? (
        <div className={LearningCss.learningCardSection}>
          <LearningCard question={questions[curQues]} />

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
                  <span style={{ margin: '0 1rem' }}>
                    {curQues + 1}/{questions.length}
                  </span>
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
              <div className={LearningCss.progressBar}>
                <Progress
                  percent={((curQues + 1) / questions.length) * 100}
                  size="small"
                  status="active"
                  showInfo={false}
                />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      )}

      {/* Post Publisher------------------------------- */}
      <div className={LearningCss.postPublisher}>
        <Row>
          <Col span={14}>
            <Row justify="space-between" gutter={16}>
              <Col
                className={[LearningCss.authorShortInfo, 'gutter-row']}
                span={12}
              >
                <Avatar
                  src={
                    'https://i1.sndcdn.com/artworks-58zqzq1zBNTFqO1T-yfxFSQ-t240x240.jpg'
                  }
                  size={{ xs: 22, sm: 30, md: 38, lg: 62, xl: 78, xxl: 98 }}
                ></Avatar>
                <div className={LearningCss.postAuthor}>Rick Astley</div>
              </Col>
              <Col
                className={[LearningCss.courseOptionsContainer, 'gutter-row']}
                span={12}
              >
                <Button
                  className={LearningCss.courseOptionsBtn}
                  type="default"
                  icon={<img src={shareCourseIcon} alt="Share" />}
                  size={'middle'}
                >
                  Chia sẻ
                </Button>
                <Button
                  className={LearningCss.courseOptionsBtn}
                  type="default"
                  icon={<img src={duplicateIcon} alt="Save" />}
                  size={'middle'}
                ></Button>
                <Button
                  className={LearningCss.courseOptionsBtn}
                  type="default"
                  icon={<img src={moreItemsIcon} alt="More" />}
                  size={'middle'}
                ></Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* Learning Card------------------------------- */}
      <Row className={LearningCss.terminologySection}>
        <Col span={20}>
          <h2 style={{ fontSize: '1.25rem' }}>
            Thuật ngữ trong học phần này (
            {questions.length > 0 ? questions.length : ''})
          </h2>
          {/* <div>
            {rawQuestion.map((ques, i) => {
              return <QuestionSlide key={i} question={ques} />;
            })}
          </div> */}
          <div>
            {questions.length > 0 ? (
              <div>
                {questions.map((item, i) => {
                  return <QuestionSlide key={i} question={item} />;
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Learning;
