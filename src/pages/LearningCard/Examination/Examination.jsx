import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Col, Modal, Row, Skeleton } from 'antd';
import ExaminationCss from '../FullScreen.module.css';

import { getAQuestionBank } from '../../../apis/QuestionBankService';
import ExamSlide from './ExamSlide';

//Do not delete this
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

let doughNutChartData = {
  labels: ['Câu đúng', 'Câu sai'],
  datasets: [
    {
      data: [],
      backgroundColor: ['#72E8B5', 'rgb(255, 99, 132)'],
      hoverOffset: 4,
    },
  ],
};

const testType = [
  {
    type: 'B1',
    totalQues: 30,
    minimumRight: 28,
  },
  {
    type: 'B2',
    totalQues: 35,
    minimumRight: 32,
  },
];

const Examination = () => {
  const location = useLocation();
  //Timer
  const initialTime = 20 * 60; // 20 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  //Questions and answers, score
  const [examQuestions, setExamQuestions] = useState([]);
  const [testTypes, setTestTypes] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(examQuestions.length).fill(null),
  );
  const [isCorrectDanger, setIsCorrectDanger] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  //Modal for showing score
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const showConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };
  const handleOk = () => {
    handleSubmitExam();
    setIsConfirmModalOpen(false);
    setIsScoreModalOpen(true);
  };
  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const showScoreModal = () => {
    setIsScoreModalOpen(true);
  };
  const handleViewAns = () => {
    setIsScoreModalOpen(false);
  };
  const handleNavHome = () => {
    setIsScoreModalOpen(false);
  };
  const [loading, setLoading] = useState(true);

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
    doughNutChartData.datasets[0].data = [];
    doughNutChartData.datasets[0].data.push(rightAns);
    doughNutChartData.datasets[0].data.push(testTypes?.totalQues - rightAns);
    checkIsSelectDanger();
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
    } else if (examQuestions.length > 0) {
      if (!showScore) {
        const timer = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        setLoading(false);
        return () => clearInterval(timer);
      }
    }
  }, [time, examQuestions]);

  useEffect(() => {
    const questionBankId = location.state?.questionBankId;
    const type = location.state?.testType;
    if (questionBankId) {
      if (type == 'B1') {
        setTestTypes(testType[0]);
      } else {
        setTestTypes(testType[1]);
      }
      getAQuestionBank(questionBankId).then((rs) => {
        setExamQuestions(rs.data.newQuestion);
      });
    } else {
      window.location.href = '/QuizPage';
    }
  }, []);

  // const test = () => {
  //   console.log('Exam questionss ', examQuestions);
  //   console.log('Selected questionss ', selectedAnswers);
  //   const test = checkIsSelectDanger();
  //   console.log(test);
  // };

  const checkAllSelected = () => {
    if (selectedAnswers.length != examQuestions.length) {
      return false;
    }
    return true;
  };

  const checkIsSelectDanger = () => {
    //Lay tat ca nhug cau diem liet trong bo de, roi them index cua cau hoi de tim kiem cau tra loi da chon (theo index)
    const dangerQues = examQuestions.filter((item) => item.isDanger == true);
    const addIndex = dangerQues.map((ques) => {
      const index = examQuestions.indexOf(ques);
      ques.index = index;
      return ques;
    });
    //Neu co chon dap an, chon dung -> true, else false
    const result = addIndex.map((question) => {
      const indexQuestion = question.index;
      const selectingAns = selectedAnswers[indexQuestion];
      if (selectingAns) {
        if (selectingAns.isCorrect) {
          return true;
        }
        return false;
      } else {
        return false;
      }
      // console.log(question);
      // console.log(selectedAnswers[indexQuestion]);
    });
    if (result.includes(false)) {
      setIsCorrectDanger(false);
      return false;
    }
    setIsCorrectDanger(true);
    return true;
  };

  return (
    <div className={ExaminationCss.examinationMode}>
      <Skeleton loading={loading} active style={{ minHeight: '80vh' }}>
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
                    className={`
                  ${ExaminationCss.stickyRefItem} 
                  ${
                    selectedAnswers[index] != undefined
                      ? ExaminationCss.refItemSelected
                      : ''
                  }
                  `}
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
              {/* <button onClick={test}>Check check</button> */}
              {/* Score modal -------------------------------------------------------------*/}

              <Modal
                title="Điểm của bạn"
                width={'60vw'}
                open={isScoreModalOpen}
                onOk={handleViewAns}
                onCancel={handleNavHome}
                maskClosable={false}
                cancelText="Xem lại câu trả lời"
                okText="Quay về"
                centered
              >
                <div className={ExaminationCss.scoreModalContainer}>
                  <div className={ExaminationCss.chartContainer}>
                    <Doughnut data={doughNutChartData} />
                  </div>
                  <div className={ExaminationCss.scoreNotification}>
                    {score <= testTypes?.minimumRight ? (
                      <h3
                        className={`${ExaminationCss.notifyHeader} ${ExaminationCss.warning}`}
                      >
                        Bạn không đạt yêu cầu
                      </h3>
                    ) : (
                      <h3
                        className={`${ExaminationCss.notifyHeader} ${ExaminationCss.success}`}
                      >
                        Xin chúc mừng, bạn đã đạt yêu cầu!
                      </h3>
                    )}

                    <div>
                      Có {testTypes?.totalQues} câu hỏi,{' '}
                      <span className={ExaminationCss.notifyRightAns}>
                        bạn đã trả lời đúng {score}/{testTypes?.totalQues} câu.
                      </span>
                      <br />
                      {isCorrectDanger ? (
                        ''
                      ) : (
                        <b>Và bạn đã trả lời sai câu điểm liệt</b>
                      )}
                      <div>
                        Bạn phải đạt {testTypes?.minimumRight}/
                        {testTypes?.totalQues} câu để đỗ
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              {/* point hereee{' '}
              {showScore ? (
                <p>
                  {score}/{examQuestions.length}
                </p>
              ) : (
                ''
              )} */}
            </div>
            {examQuestions?.map((question, index) => {
              return (
                <ExamSlide
                  showScore={showScore}
                  key={index}
                  question={question}
                  questionIndex={index}
                  examLength={examQuestions.length}
                  handleAnsClick={handleAnswerClick}
                />
              );
            })}
            {showScore ? (
              <Button size="large" type="primary" onClick={showScoreModal}>
                Xem điểm
              </Button>
            ) : (
              <Button size="large" type="primary" onClick={showConfirmModal}>
                Nộp bài
              </Button>
            )}

            <Modal
              title="Xác nhận nộp bài"
              open={isConfirmModalOpen}
              onOk={handleOk}
              okText="Nộp bài"
              onCancel={handleCancel}
              cancelText="Quay lại"
              centered
            >
              {checkAllSelected() ? (
                <p>Bạn có muốn thực sự nộp bài?</p>
              ) : (
                <p>
                  Vẫn còn câu hỏi bạn chưa trả lời đấy, bạn muốn xem câu hỏi đã
                  bỏ qua hay nộp bài?
                </p>
              )}
            </Modal>
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
};

export default Examination;
