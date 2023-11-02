import axios from "axios";
import { ABSENT_API_URL } from "./APIConfig";

const getAllAbsent = () => {
    return axios.get(`${ABSENT_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const sendAbsentRequest = (teacher, reason, dateAbsent) => {
    return axios.post(`${ABSENT_API_URL}`, {
        teacher,
        reason,
        dateAbsent
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export { getAllAbsent, sendAbsentRequest }