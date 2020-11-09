import axios from "axios";

export const LOGIN_URL = "http://tianmengroup.com/server/socket/user/postLogin.php";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "http://tianmengroup.com/server/socket/user/verify.php";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken(token) {
  return axios.post(ME_URL, { token });
}
