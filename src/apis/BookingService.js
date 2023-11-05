import axios from 'axios';
import { BOOKING_API_URL } from './APIConfig';

const getAllBookings = () => {
  return axios.get(BOOKING_API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getStudentBookings = (userId, role) => {
  if (role === "user") {
    return axios.get(`${BOOKING_API_URL}?user=${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } else {
    if (role === "teacher") {
      return axios.get(`${BOOKING_API_URL}?teacher=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
  }
}

const updateDateBooking = (_id, date) => {
  return axios.patch(
    BOOKING_API_URL + `/${_id}`,
    { date },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

const deleteBooking = (_id) => {
  return axios.delete(BOOKING_API_URL + `/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getAvailableTeacher = (date) => {
  return axios.get(`${BOOKING_API_URL}/available-teacher?date=${date}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getAvailableTime = (teacherId, date) => {
  return axios.get(
    `${BOOKING_API_URL}/available-slot/${teacherId}?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

const createBooking = (user, teacher, course, date, timeStart) => {
  return axios.post(
    `${BOOKING_API_URL}`,
    {
      user,
      teacher,
      course,
      date,
      timeStart,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

export {
  getAllBookings,
  getAvailableTeacher,
  getAvailableTime,
  getStudentBookings,
  createBooking,
  updateDateBooking,
  deleteBooking,
};

