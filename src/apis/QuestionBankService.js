import axios from 'axios';
import { QUESTION_BANK_API_URL } from './APIConfig';

const getAQuestionBank = (questionBankId) => {
  return axios.get(`${QUESTION_BANK_API_URL}/${questionBankId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export { getAQuestionBank };
