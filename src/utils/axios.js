import axios from "axios";

export const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://192.168.142.176:5000/api/v1/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //


instance.interceptors.request.use(
    (config) => {
      // Modify config object to set the header
      config.headers['Authorization'] = localStorage.getItem("token"); // Set your access token or any other header
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  export default instance;