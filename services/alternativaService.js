// src/services/alternativasService.js
import api from "./api";

export async function createAlternativa(payload) {
  const { data } = await api.post("/alternativas", payload);
  return data;
}

export async function updateAlternativa(id, payload) {
  const { data } = await api.put(`/alternativas/${id}`, payload);
  return data;
}

export async function getAlternativasByQuestaoId(id) {
  const { data } = await api.get(`/alternativas/${id}`);
  return data;
}
