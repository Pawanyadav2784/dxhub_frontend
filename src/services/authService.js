import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

export const authService = {
  async register(userData) {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data.token) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },

  async login(email, password) {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.data.token) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  async resetPassword(email, otp, password) {
    const response = await api.put(ENDPOINTS.AUTH.RESET_PASSWORD, { email, otp, password });
    return response.data;
  },

  async getProfile() {
    const response = await api.get(ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put(ENDPOINTS.AUTH.PROFILE, userData);
    if (response.data.token) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('userInfo');
  },

  getCurrentUser() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};

export default authService;
