import axios from 'axios';
import { CAR_API_URL } from './APIConfig';


const getCar = () => {
    return axios.get(`${CAR_API_URL}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const addCar = (name, brand, licensePlate, status) => {
    return axios.post(`${CAR_API_URL}`, {
        name,
        brand,
        licensePlate,
        status,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const deleteCar = (CourseID) => {
    return axios.delete(`${CAR_API_URL}/${CourseID}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const updateCar = (CourseID, name, brand, licensePlate, status) => {
    return axios.patch(
        `${CAR_API_URL}/${CourseID}`,
        {
            name,
            brand,
            licensePlate,
            status,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    );
};


export { getCar, deleteCar, addCar, updateCar };
