import axios from "axios"
import { USER_API_URL } from "./APIConfig"

const getAllUsers = () => {
    return axios.get(`${USER_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const addUser = (name , role) => {
    return axios.post(`${USER_API_URL}`, {
        name,
        role,
    })
}

const deleteUser = (userId) => {
    return axios.delete(`${USER_API_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const updateUser = (userId, name, role) => {
    return axios.patch(`${USER_API_URL}/${userId}`, {
        name,
        role,
        // birthdate,
        // avatar
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export {getAllUsers, addUser, deleteUser, updateUser}