import axios from "axios"
import { TRAFFIC_API_URL } from "./APIConfig"

const getTrafficSigns = () => {
    return axios.get(TRAFFIC_API_URL)
}

//Category API
const getTrafficCategory = () => {
    return axios.get(`${TRAFFIC_API_URL}-category`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}})
}

const addTrafficCategory = (trafficType) => {
    return axios.post(`${TRAFFIC_API_URL}-category`, {
        trafficType
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const updateTrafficCategory = (trafficCategoryId, trafficType) => {
    return axios.patch(`${TRAFFIC_API_URL}-category/${trafficCategoryId}`, {
        trafficType
    })
}

const deleteTrafficCategory = (trafficCategoryId) => {
    return axios.delete(`${TRAFFIC_API_URL}-category/${trafficCategoryId}`)
}

export { getTrafficSigns, getTrafficCategory, addTrafficCategory, updateTrafficCategory, deleteTrafficCategory }