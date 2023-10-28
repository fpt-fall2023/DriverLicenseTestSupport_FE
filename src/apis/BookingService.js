import axios from 'axios';
import { BOOKING_API_URL } from './APIConfig';

const getBookings = () => {
    return axios.get(BOOKING_API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

const getAvailableTeacher = () => {
    return axios.get(`${BOOKING_API_URL}/available-teacher`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

const getAvailableTime = (teacherId, date) => {
    return axios.get(`${BOOKING_API_URL}/available-slot/${teacherId}?date=${date}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

const createBooking = (user, teacher, course, date, timeStart) => {
    return axios.post(`${BOOKING_API_URL}`, {
        user: "651fb16557a2699235753b2d",
        teacher,
        course,
        date,
        timeStart
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export { getBookings, getAvailableTeacher, getAvailableTime, createBooking }