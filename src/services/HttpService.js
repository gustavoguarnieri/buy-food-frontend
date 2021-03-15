import axios from "axios";
import UserService from "./UserService";

// const HttpMethods = {
//   GET: 'GET',
//   POST: 'POST',
//   PUT: 'PUT',
//   DELETE: 'DELETE',
// };

// const baseAxios = axios.create({
//   baseURL: `http://localhost:80/buy-food`,
//   headers: {
//     Authorization: `Bearer ${UserService.getToken()}`
//   }
// });

// const AxiosConfig = { headers: { Authorization: `Bearer ${UserService.getToken()}` } };

// const axios = axios.create();

// const configure = () => {
//   axios.interceptors.request.use((config) => {
//     if (UserService.isLoggedIn()) {
//       const cb = () => {
//         config.headers.Authorization = `Bearer ${UserService.getToken()}`;
//         //config.baseURL = `https://buy-food.azurewebsites.net/buy-food`
//         config.baseURL = `http://localhost:80/buy-food`
//         return Promise.resolve(config);
//       };
//       return UserService.updateToken(cb);
//     }
//   });
// };

// const getAxiosClient = () => axios;
//
//
// const HttpService = {
//   HttpMethods,
//   configure,
//   getAxiosClient,
// };


// const HttpService = {
//   Axios,
//   AxiosConfig,
// };
//
// export default HttpService;