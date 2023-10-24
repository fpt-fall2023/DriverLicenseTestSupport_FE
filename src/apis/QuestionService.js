import axios from "axios"
import { QUESTION_API_URL, CATEGORY_API_URL, QUESTION_BANK_API_URL } from "./APIConfig"


//Question API
const getQuestions = () => {
    return axios.get(QUESTION_API_URL)
}

const addQuestion = (questionName, answers, category) => {
    return axios.post(QUESTION_API_URL, {
        questionName,
        answers,
        category,
    })
}

const updateQuestion = (questionId, questionName, answers) => {
    return axios.patch(`${QUESTION_API_URL}/${questionId}`, {
        questionName,
        answers,
        isDanger: false
    })
}

const deleteQuestion = (questionId) => {
    return axios.delete(`${QUESTION_API_URL}/${questionId}`)
}

//Category API
const getCategory = () => {
    return axios.get(`${CATEGORY_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const addCategory = (categoryName) => {
    return axios.post(`${CATEGORY_API_URL}`, {
        questionType: categoryName,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const updateCategory = (categoryId, categoryName) => {
    return axios.patch(`${CATEGORY_API_URL}/${categoryId}`, {
        questionType: categoryName
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteCategory = (categoryId) => {
    return axios.delete(`${CATEGORY_API_URL}/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

// QuestionBank API
const getQuestionBank = () => {
    return axios.get(`${QUESTION_BANK_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const getQuestionBankById = (questionBankId) => {
    return axios.get(`${QUESTION_BANK_API_URL}/${questionId}`)
}

const addQuestionBank = (questionBankName, question, driveType) => {
    return axios.post(`${QUESTION_BANK_API_URL}`, {
        questionBankName,
        question,
        driveType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteQuestionBank = (questionBankId) => {
    return axios.delete(`${QUESTION_BANK_API_URL}/${questionBankId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export {getQuestions, addQuestion, updateQuestion, deleteQuestion, getCategory, addCategory, updateCategory, deleteCategory, getQuestionBank, getQuestionBankById, addQuestionBank, deleteQuestionBank}