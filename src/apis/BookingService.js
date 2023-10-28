import axios from 'axios';
import { BOOKING_API_URL } from './APIConfig';

const getAllBookings = () => {
  return axios.get(BOOKING_API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

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
        user: ,
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

export { getAllBookings, getAvailableTeacher, getAvailableTime, createBooking }
