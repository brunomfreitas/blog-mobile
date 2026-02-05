// // services/api.js
// import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
// });

// // token em memória (funciona em RN e Web)
// let memoryToken = null;

// export function setApiToken(token) {
//   memoryToken = token || null;

//   if (memoryToken) {
//     api.defaults.headers.common.Authorization = `Bearer ${memoryToken}`;
//   } else {
//     delete api.defaults.headers.common.Authorization;
//   }
// }

// // Interceptor opcional: garante header se api.defaults não estiver setado
// api.interceptors.request.use((config) => {
//   if (!config.headers) config.headers = {};

//   if (!config.headers.Authorization && memoryToken) {
//     config.headers.Authorization = `Bearer ${memoryToken}`;
//   }

//   return config;
// });


import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:3000' });

// token em memória (funciona em RN e Web)
let memoryToken = null;

export function setApiToken(token) {
  memoryToken = token || null;

  if (memoryToken) {
    api.defaults.headers.common.Authorization = `Bearer ${memoryToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;