// import React from "react";
import { useEffect, useReducer, useState } from 'react';
import { Avatar, Button, Col, Progress, Row, Tooltip } from 'antd';

import LearningCss from './Learning.module.css';
import './Flip.css';

import shuffleIcon from '../../assets/icons/shuffle.png';
import startIcon from '../../assets/icons/play.png';
import fullScreenIcon from '../../assets/icons/fullScreen.png';
import nextQuesIcon from '../../assets/icons/navigate_next.png';
import prevQuesIcon from '../../assets/icons/navigate_before.png';
import shareCourseIcon from '../../assets/icons/ios_share.png';
import duplicateIcon from '../../assets/icons/content_copy.png';
import moreItemsIcon from '../../assets/icons/more_horiz.png';

import adminImage from '../../assets/images/profile_admin.png';

import LearningCard from './LearningCard';
import QuestionSlide from './QuestionSlide';

import { getQuestions } from '../../apis/QuestionService';
import { LoadingOutlined } from '@ant-design/icons';

const categoryList = [
  'khái niệm và quy tắc giao thông đường bộ',
  'nghiệp vụ vận tải',
  'văn hóa & đạo đức người lái xe',
  'kỹ thuật lái xe',
  'cấu tạo sữa chữa',
  'hệ thống biển báo hiệu đường bộ',
  'sa hình và kỹ năng xử lý tình huống giao thông',
  'mất an toàn giao thông nghiêm trọng (câu hỏi điểm liệt)',
];

let filterData = {
  category: '',
  questions: [],
};
let autoLearning;

const Learning = () => {
  const [questions, setQuestions] = useState([]);
  const [curQues, setCurQues] = useState(0);
  // const [paginationQues, setPaginationQues] = useState([]);
  const [filteredData, setFilteredData] = useState(filterData);
  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0);
  const [isAutoLearning, setIsAutoLearning] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const handleNextQues = () => {
    if (isShuffle) {
      setCurQues(shuffleQuestion(filteredData.questions.length - 1));
    } else if (curQues < filteredData.questions.length - 1) {
      setCurQues(curQues + 1);
    }
  };

  const handlePrevQues = () => {
    if (isShuffle) {
      setCurQues(shuffleQuestion(filteredData.questions.length - 1));
    } else if (curQues > 0) {
      setCurQues(curQues - 1);
    }
  };

  const filterCategory = (cate) => {
    let sample = filterData;

    const index = categoryList.indexOf(cate);
    if (index != -1) {
      sample.category = cate;
      sample.questions = questions.filter(
        (ques) => ques.category.questionType == categoryList[index],
      );
      setFilteredData(sample);
      setCurQues(0);
      setForceUpdate();
    } else {
      console.log('Category not found');
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchData = async () => {
      try {
        const result = await getQuestions();
        setQuestions(result.data.data.Question);
        let sample = filterData;
        sample.category = 'Tất cả câu hỏi';
        sample.questions = result.data.data.Question;
        setFilteredData(sample);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const autoNextQuestion = () => {
    if (isAutoLearning === false) {
      setIsAutoLearning(true);
      autoLearning = setInterval(() => {
        console.log('Is running autolearn');
        setCurQues((prevCurQues) => {
          if (prevCurQues < filteredData.questions.length - 1) {
            return prevCurQues + 1;
          } else {
            // Stop auto-learning when you reach the end
            console.log('Autolearn end cause reach the end');
            clearInterval(autoLearning);
            setIsAutoLearning(false);
            return prevCurQues;
          }
        });
      }, 4200);
    } else {
      setIsAutoLearning(false);
      clearInterval(autoLearning);
    }
  };

  const shuffleQuestion = (maxValue) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (maxValue + 1));

    return randomNumber;
  };

  const onShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return (
    <div className={LearningCss.learningContainer}>
      <div className="learningHeader">
        <div className={LearningCss.learningPageTitle}>Câu hỏi lái xe</div>

        <Row
          style={{ marginRight: '10px' }}
          className={LearningCss.studyModeNavList}
          justify="space-between"
        >
          {categoryList.map((category, index) => {
            return (
              <Col
                key={index}
                className={[
                  LearningCss.studyModeNavItem,
                  LearningCss.studyModeCard,
                ]}
                span={5}
                onClick={() => filterCategory(categoryList[index])}
              >
                <span>Chương {index + 1}</span>
              </Col>
            );
          })}
        </Row>
      </div>
      {filteredData.questions.length > 0 ? (
        <div className={LearningCss.learningCardSection}>
          <LearningCard question={filteredData.questions[curQues]} />

          {/* Navigate Section------------------------------------------- */}
          <Row justify={'space-between'}>
            <Col span={14} className="navigation">
              <Row>
                <Col className={LearningCss.firstAction} span={8}>
                  <Tooltip title="Tự động học">
                    <Button
                      style={{ marginRight: '10px' }}
                      title="Search"
                      shape="circle"
                      onClick={autoNextQuestion}
                      icon={<img src={startIcon} alt="Start" />}
                    />
                  </Tooltip>
                  <Tooltip title="Shuffle">
                    <Button
                      title="Search"
                      shape="circle"
                      onClick={onShuffle}
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
                    {curQues + 1}/{filteredData.questions.length}
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
                <div style={{ textAlign: 'center' }}>
                  {isAutoLearning ? 'Auto Learning is on' : ''}
                  {isShuffle ? 'Shuffle is on' : ''}
                </div>
                <Progress
                  percent={
                    ((curQues + 1) / filteredData.questions.length) * 100
                  }
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
                  src={adminImage}
                  size={{ xs: 22, sm: 30, md: 38, lg: 62, xl: 78, xxl: 98 }}
                ></Avatar>
                <div className={LearningCss.postAuthor}>Admin</div>
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
            {filteredData.questions.length > 0
              ? filteredData.questions.length
              : ''}
            )<div>{filteredData.category}</div>
          </h2>
          <div>
            {filteredData.questions.length > 0 ? (
              <div>
                {filteredData.questions.map((item, i) => {
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
