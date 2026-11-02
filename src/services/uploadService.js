import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

export const uploadService = {
  async uploadImages(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    const response = await api.post(ENDPOINTS.UPLOAD.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.urls;
  },

  async deleteImage(publicId) {
    const response = await api.delete(ENDPOINTS.UPLOAD.DELETE, { data: { publicId } });
    return response.data;
  }
};

export default uploadService;
