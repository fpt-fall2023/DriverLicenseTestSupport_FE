import axios from "axios"
import { USER_API_URL } from "./APIConfig"

const getAllUsers = () => {
    return axios.get(`${USER_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteUser = (userId) => {
    return axios.delete(`${USER_API_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export {getAllUsers, deleteUser}