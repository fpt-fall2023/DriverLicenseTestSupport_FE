import axios from 'axios';
import { SLOT_API_URL } from './APIConfig';

const getSlot = () => {
  return axios.get(SLOT_API_URL, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,}});
};

const addSlot = (time) => {
  return axios.post(
    SLOT_API_URL,
    {
      time,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

const deleteSlot = (SlotId) => {
  return axios.delete(`${SLOT_API_URL}/${SlotId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const updateSlot = (SlotId , time) => {
  return axios.post(
    `${SLOT_API_URL}/${SlotId}`,
    {
      time,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

export { getSlot, addSlot, deleteSlot, updateSlot };
