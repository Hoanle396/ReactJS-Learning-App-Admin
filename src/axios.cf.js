import * as axios from "axios";
var axioscf = axios.create({
  baseURL: 'http://192.168.1.19:3000/api',
});
axioscf.interceptors.request.use(
   config => {
     if (!config.headers.Authorization) {
      const token = localStorage.getItem('token')
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
     }
     return config;
   },
   error => Promise.reject(error)
 );

export default axioscf;