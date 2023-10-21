import { useEffect, useState } from 'react';
import ExaminationCss from '../FullScreen.module.css';
import ExamSlide from './ExamSlide';
import { Col, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import { getAQuestionBank } from '../../../apis/QuestionBankService';

const Examination = () => {
  const location = useLocation();
  //Timer
  const initialTime = 20 * 60; // 20 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [examQuestions, setExamQuestions] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(examQuestions.length).fill(null),
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (questionIndex, selectedAns) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = selectedAns;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitExam = () => {
    let rightAns = 0;
    for (let i = 0; i < examQuestions.length; i++) {
      if (selectedAnswers[i] != null && selectedAnswers[i].isCorrect == true) {
        rightAns++;
      }
    }
    setScore(rightAns);
    setShowScore(true);
    return rightAns;
  };
  const scrollToItem = (targetId) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  useEffect(() => {
    if (time <= 0) {
      // Timer is up, you can add your logic here
      const rightAns = handleSubmitExam();
      alert(`
      Đã hết giờ làm bài! \n
      Đáp án đúng của bạn là: ${rightAns}/${examQuestions.length}
      `);
    } else {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  useEffect(() => {
    const questionBankId = location.state?.questionBankId;
    if (questionBankId) {
      getAQuestionBank(questionBankId).then((rs) => {
        setExamQuestions(rs.data.newQuestion);
      });
    } else {
      window.location.href = '/QuizPage';
    }
  }, []);

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);
  const test = () => {
    console.log(selectedAnswers[0]);
  };

  return (
    <div className={ExaminationCss.examinationMode}>
      <div className={ExaminationCss.referenceQues}>
        <div className={ExaminationCss.stickyRefQues}>
          <div>
            <div>Thời gian làm bài:</div>
            <div>
              {minutes}:{seconds}
            </div>
          </div>
          <ul className={ExaminationCss.stickyRefList}>
            {examQuestions.map((ques, index) => {
              return (
                <li
                  key={index}
                  onClick={() => scrollToItem(`refTo_${index}`)}
                  className={[
                    ExaminationCss.stickyRefItem,
                    // selectedAnswers[index] != undefined
                    //   ? ExaminationCss.selected
                    //   : '',
                  ]}
                >
                  {index + 1}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Row justify="center">
        <Col span={18}>
          <div>
            <button onClick={test}>Check check</button>
            point hereee{' '}
            {showScore ? (
              <p>
                {score}/{examQuestions.length}
              </p>
            ) : (
              ''
            )}
          </div>
          {examQuestions?.map((question, index) => {
            return (
              <ExamSlide
                key={index}
                question={question}
                questionIndex={index}
                examLength={examQuestions.length}
                handleAnsClick={handleAnswerClick}
              />
            );
          })}
          <button onClick={handleSubmitExam}>Submit exam</button>
        </Col>
      </Row>
    </div>
  );
};

export default Examination;
