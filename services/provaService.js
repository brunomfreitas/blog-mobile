import api from "./api";

/* ===================== PROVA ===================== */

export async function getAllProva(page = 1, limit = 10, params = {}) {
  const resp = await api.get("/prova", {
    params: {
      page,
      limit,
      ...params,
    },
  });
  return resp;
}

export async function getProvaById(id, params = {}) {
  const { data } = await api.get(`/prova/${id}`, { params });
  return data;
}

export async function createProva(payload) {
  	const { data } = await api.post("/prova", payload);
  return data;
}

export async function updateProva(id, payload) {
  const { data } = await api.put(`/prova/${id}`, payload);
  return data;
}

export async function deleteProva(id) {
  const { data } = await api.delete(`/prova/${id}`);
  return data;
}

/* ===================== PROVA_ALUNO ===================== */

export async function startProvaAluno(payload) {
  const { data } = await api.post("/prova-aluno/start", payload);
  return data;
}

export async function finishProvaAluno(payload) {
  const { data } = await api.post("/prova-aluno/finish", payload);
  return data;
}

/* ===================== PROVA_ALUNO_RESPOSTA ===================== */

export async function saveManyProvaAlunoResposta(payload) {
  const { data } = await api.post("/prova-aluno-resposta/save-many", payload);
  return data;
}