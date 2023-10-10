import axios from "axios"
import { QUESTION_API_URL } from "./APIConfig"

const getQuestions = () => {
    return axios.get(QUESTION_API_URL)
}

const addQuestion = (questionName, answers, category) => {
    return axios.post(QUESTION_API_URL, {
        questionName,
        answers,
        category
    })
}

const updateQuestion = (questionName, answers, category) => {
    return axios.patch(QUESTION_API_URL, {
        questionName,
        answers,
        category
    })
}

const deleteQuestion = (questionId) => {
    return axios.delete(`${QUESTION_API_URL}/${questionId}`)
}

export {getQuestions, addQuestion, updateQuestion, deleteQuestion}