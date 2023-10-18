import axios from "axios"
import { QUESTION_API_URL } from "./APIConfig"

const getQuestions = () => {
    
}

const addQuestion = (questionName, answers, categoryData) => {
    
    return axios.post(QUESTION_API_URL, {
        questionName,
        answers,
        category: categoryData,

    })
}

const updateQuestion = () => {

}

const deleteQuestion = () => {
    
}

export {getQuestions, addQuestion, updateQuestion, deleteQuestion}