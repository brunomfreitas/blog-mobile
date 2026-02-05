// src/services/personService.js
import api from "./api";

export async function getTeachers(token) {
  const resp =  await api.get('/person/type/P', {
    headers: { Authorization: `Bearer ${token}` }    
  });
  return resp;
}

export async function getStudents(token) {
  const resp =  await api.get('/person/type/A', {
    headers: { Authorization: `Bearer ${token}` }    
  });
  return resp;
}

export async function searchTeachers(token, q, type = "P") {
  return api.get("/person/search", {
    params: { q, type },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function searchStudents(token, q, type = "A") {
  return api.get("/person/search", {
    params: { q, type },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createPerson(payload) {
  const { data } = await api.post("/person", payload);
  return data;
}

export async function updatePerson(id, payload) {
  const { data } = await api.put(`/person/${id}`, payload);
  return data;
}

export async function getPersonById(id) {
  const { data } = await api.get(`/person/${id}`);
  return data;
}

export async function deletePerson(id, person, token) {
	person.status = false;

  	const { data } = await api.put(`/person/${id}`, person, {
	    headers: { Authorization: `Bearer ${token}` },
  	});
  return data;
}
