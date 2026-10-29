import _axios from 'axios';

console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);

const axiosInstance = _axios.create({
   baseURL:
      import.meta.env.VITE_BACKEND_URL || '',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   },
});

export { axiosInstance as axios };
