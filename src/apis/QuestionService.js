import axios from "axios"
import { QUESTION_API_URL } from "./APIConfig"

const getQuestions = () => {
    axios.get(QUESTION_API_URL)
}

const addQuestion = (questionName, answers) => {
    axios.post(USER_API_URL, {
        questionName,
        answers
    })
}

const updateQuestion = () => {

}

const deleteQuestion = () => {
    
}

export {getQuestions, addQuestion, updateQuestion, deleteQuestion}