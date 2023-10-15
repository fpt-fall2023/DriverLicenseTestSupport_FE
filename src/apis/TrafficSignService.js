import axios from "axios"
import { TRAFFIC_API_URL } from "./APIConfig"

const getTrafficSigns = () => {
    return axios.get(TRAFFIC_API_URL)
}

export { getTrafficSigns }