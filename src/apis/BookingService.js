import axios from 'axios';
import { BOOKING_API_URL } from './APIConfig';

const getAllBooking = () => {
  return axios.get(BOOKING_API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export { getAllBooking };
