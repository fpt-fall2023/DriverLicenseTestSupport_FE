import axios from "axios";
import { BOOKING_API_URL } from "./APIConfig";

const getAllBookings = () => {
    return axios.get(BOOKING_API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export { getAllBookings }