import JwtDecode from 'jwt-decode';

import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/auth';

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem('token', jwt);
}

function loginWithJWT(jwt) {
  localStorage.setItem('token', jwt);
}

function logout() {
  localStorage.removeItem('token');
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return JwtDecode(jwt); //解构出jwt获取到当前用户
  } catch (ex) {
    return null;
  }
}

function getJWT() {
  return localStorage.getItem('token');
}

http.setJWT(getJWT());

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
};
