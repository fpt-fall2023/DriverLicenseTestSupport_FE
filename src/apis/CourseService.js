import axios from 'axios';
import { COURSE_API_URL } from './APIConfig';


const getCourse = () => {
    return axios.get(`${COURSE_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const addCourse = (courseName, description, startDate, endDate) => {
    return axios.post(`${COURSE_API_URL}`, {
        courseName,
        description,
        startDate,
        endDate
    }, {
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

const updateCourse = (CourseID, courseName, description, startDate, endDate) => {
    return axios.patch(
        `${COURSE_API_URL}/${CourseID}`,
        {
            courseName,
            description,
            startDate,
            endDate
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    );
};


export { getCourse, deleteCourse, addCourse, updateCourse };
