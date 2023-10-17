import { getCategory } from "../../../apis/QuestionService";

const getQuestionCategory = () => {
    getCategory().then((res) => {
        console.log(res.data.questionType)
        setCategories(res.data.questionType)
    })
}

export { getQuestionCategory }