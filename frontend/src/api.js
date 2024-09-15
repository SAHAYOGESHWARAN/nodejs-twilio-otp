import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const sendOtp = (data) => API.post('/otp/send-otp', data);
export const verifyOtp = (data) => API.post('/otp/verify-otp', data);
