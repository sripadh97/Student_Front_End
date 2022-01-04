import axios from 'axios';
import { getAuthCookie } from './authHelper';

const BASE_URL = "http://localhost:8080/api/v3";

export const httpRequest = (uri, method, payload) => {  
  let token = '';
  if (getAuthCookie()) {
    // eslint-disable-next-line prefer-destructuring
    token = getAuthCookie();
  }
  return axios
    .request({
      url: `${BASE_URL}${uri}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: payload
    })
    .then(res => res)
    .catch(err => {
      if (err.response) {
        return err.response
      }
      alert( 'The API server is not running now.');
    });
};
