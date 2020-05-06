import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

axios.interceptors.response.use(null, (error) => {
  const exceptedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!exceptedError) {
    logger.log(error);
    toast.error('An unexpected error occurrred.');
  }

  return Promise.reject(error);
});

function setJWT(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};
