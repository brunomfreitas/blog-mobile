import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ✅ Dica importante: "localhost" no celular NÃO é seu PC.
// Use o IP da sua máquina na rede, ex: http://192.168.0.10:3000
const api = axios.create({ baseURL: "http://192.168.0.9:3000" });

// token em memória (rápido)
let memoryToken = null;

export async function setApiToken(token) {
  memoryToken = token || null;

  if (memoryToken) {
    api.defaults.headers.common.Authorization = `Bearer ${memoryToken}`;
    await AsyncStorage.setItem("token", memoryToken);
  } else {
    delete api.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem("token");
  }
}

// opcional: carregar token salvo ao iniciar o app
export async function loadApiToken() {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    memoryToken = token;
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
}

api.interceptors.request.use(async (config) => {
  // se já tem em memória, usa ele (mais rápido)
  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
    return config;
  }

  // senão tenta do storage
  const token = await AsyncStorage.getItem("token");
  if (token) {
    memoryToken = token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
