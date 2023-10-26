import axios from 'axios';
import { COURSE_API_URL } from './APIConfig';

const getAQuestionBank = (questionBankId) => {
  return axios.get(`${COURSE_API_URL}/${questionBankId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getCourse = () => {
    return axios.get(`${COURSE_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteCourse = (CourseID) => {
    return axios.delete(`${COURSE_API_URL}/${CourseID}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export { getCourse ,deleteCourse };
