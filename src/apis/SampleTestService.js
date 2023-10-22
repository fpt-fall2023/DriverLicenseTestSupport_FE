import axios from "axios"
import { SAMPLE_TEST_API_URL } from "./APIConfig"

const getSampleTest = () => {
    return axios.get(SAMPLE_TEST_API_URL)
}

const addSampleTest = (testName, questionBank) => {
    return axios.post(SAMPLE_TEST_API_URL, {
        testName,
        questionBank
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteSampleTest = (sampleTestId) => {
    return axios.delete(`${SAMPLE_TEST_API_URL}/${sampleTestId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export {getSampleTest, addSampleTest, deleteSampleTest}