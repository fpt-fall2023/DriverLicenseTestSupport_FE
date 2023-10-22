import { Link, useLocation } from "react-router-dom"
import styles from './QuestionBank.module.css'
import { Button } from "antd"

const QuestionBankDetail = () => {
    const questionDetail = useLocation().state

    return (
        <div>
            <Link to="/dashboard/QuestionBankPage"><Button type="primary">Quay Về</Button></Link>
            <h1 style={{textAlign: "center"}}>{questionDetail.questionBankName} - Loại Đề: {questionDetail.driveType}</h1>
            <div>
                {questionDetail.question.map((question, index) => {
                    return (
                        <div key={index}>
                            <h3>Câu {index + 1}: {question.questionName}</h3>
                            {question.answers.map((answer, index) => {
                                return (
                                    <div key={index}>
                                        <p>{answer.answerName}</p>
                                    </div>
                                )
                            })}
                            <div>
                                <span>
                                    <span style={{fontWeight: "bold"}}>Đáp án đúng: </span> 
                                    {question.answers.filter((answer) => answer.isCorrect === true).map((answer) => answer.answerName)}
                                    </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionBankDetail;