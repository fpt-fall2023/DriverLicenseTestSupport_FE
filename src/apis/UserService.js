import axios from "axios"
import { USER_API_URL } from "./APIConfig"

const DEFAULT_AVATAR = "https://firebasestorage.googleapis.com/v0/b/uploadphotodrivingtest.appspot.com/o/images%2Favatar1.jpg-f86d2050-5f72-492c-b077-715534aa10d9?alt=media&token=ae98104a-43d0-4c23-9580-7b3773a5d891"

const loginAccount = (email, password) => {
    return axios.post(USER_API_URL + '/signin', {
        email,
        password
    })
}

const registerAccount = (email, password, name, phone) => {
    return axios.post(USER_API_URL + '/register', {
        email,
        password,
        passwordConfirm: password,
        avatar: DEFAULT_AVATAR,
        name,
        phone,
    })
}

const logoutAccount = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("isAdmin")
    window.location.reload()
    window.location.href = "/"
}

const updateProfile = () => {

}

export { loginAccount, registerAccount, logoutAccount, updateProfile }