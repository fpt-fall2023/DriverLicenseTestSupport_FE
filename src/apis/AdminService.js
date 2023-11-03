import axios from "axios"
import { USER_API_URL } from "./APIConfig"

const getAllUsers = () => {
    return axios.get(`${USER_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const addUser = (email, password, passwordConfirm, avatar, name, role , phone) => {
    return axios.post(`${USER_API_URL}`, {
        email,
        password,
        passwordConfirm,
        avatar,
        name,
        role,
        phone

    }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
}

const deleteUser = (userId) => {
    return axios.delete(`${USER_API_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const updateUser = (userId, role) => {
    return axios.patch(`${USER_API_URL}/${userId}`, {
        role,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    )
}

export { getAllUsers, addUser, deleteUser, updateUser }