// src/services/questaoService.js
import api from "./api";

export async function getQuestao(page = 1, limit = 10, categoryId = null) {
  const params = { page, limit };
  if (categoryId) params.category = categoryId;

  const resp = await api.get("/questao", { params });
  console.log('api questao', resp.data);
  return resp;
}

export async function searchQuestao(q, page = 1, limit = 10) {
  const { data } = await api.get("/questao/search", { params: { q, page, limit } });
  return data;
}

export async function getAllQuestao(token, page = 1, limit = 15) {
  const resp =  await api.get('/questao/all', {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });
  return resp;
}

export async function createQuestao(payload) {
  const { data } = await api.post("/questao", payload);
  return data;
}

export async function updateQuestao(id, payload) {
  const { data } = await api.put(`/questao/${id}`, payload);
  return data;
}

export async function getQuestaoById(id) {
  const { data } = await api.get(`/questao/${id}`);
  return data;
}

export async function deleteQuestao(id) {
  const { data } = await api.delete(`/questao/${id}`);
  return data;
}
