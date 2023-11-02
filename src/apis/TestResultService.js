import axios from 'axios';
import { TEST_RESULT_API_URL } from './APIConfig';

const getAllTestResult = () => {
  return axios.get(TEST_RESULT_API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const saveTestResult = (userId, sampleTestId, numRightQuestion, score) => {
  return axios.post(
    TEST_RESULT_API_URL,
    {
      userId,
      sampleTestId,
      numRightQuestion,
      score,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

export { getAllTestResult, saveTestResult };