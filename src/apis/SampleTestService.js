import axios from 'axios';
import { SAMPLE_TEST_API_URL } from './APIConfig';

//Sample test API
const getAllSampleTest = () => {
  return axios.get(SAMPLE_TEST_API_URL);
};

export { getAllSampleTest };
