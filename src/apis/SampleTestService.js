import axios from 'axios';
import { SAMPLE_TEST_API_URL } from './APIConfig';

const getSampleTest = () => {
  return axios.get(SAMPLE_TEST_API_URL);
};

const getSampleTestById = (sampleTestId) => {
  return axios
    .get(SAMPLE_TEST_API_URL + `?_id=${sampleTestId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .catch((err) => console.log(err));
};

const addSampleTest = (testName, questionBank, testType) => {
  return axios.post(
    SAMPLE_TEST_API_URL,
    {
      testName,
      questionBank,
      testType,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

const deleteSampleTest = (sampleTestId) => {
  return axios.delete(`${SAMPLE_TEST_API_URL}/${sampleTestId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export { getSampleTest, addSampleTest, deleteSampleTest, getSampleTestById };
