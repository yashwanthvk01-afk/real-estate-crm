import axios from 'axios'
// ↑ HTTP requests చేయడానికి axios import చేస్తున్నాం

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
  // ↑ Spring Boot run అయ్యే address
  // ప్రతి request కి ముందు ఈ URL automatically add అవుతుంది
  // Example: getAllClients చేస్తే
  //          http://localhost:8080/api/clients అవుతుంది
})

export const getAllClients = () => {
  return API.get('/clients')
  // ↑ GET http://localhost:8080/api/clients
  // అన్ని clients తెచ్చుకోవడానికి
}

export const getClientById = (id) => {
  return API.get(`/clients/${id}`)
  // ↑ GET http://localhost:8080/api/clients/1
  // ఒక్క client తెచ్చుకోవడానికి
  // ${id} = dynamic గా id వస్తుంది
}

export const createClient = (data) => {
  return API.post('/clients', data)
  // ↑ POST http://localhost:8080/api/clients
  // కొత్త client create చేయడానికి
  // data = form లో user enter చేసిన details
}

export const updateClient = (id, data) => {
  return API.put(`/clients/${id}`, data)
  // ↑ PUT http://localhost:8080/api/clients/1
  // existing client update చేయడానికి
}

export const deleteClient = (id) => {
  return API.delete(`/clients/${id}`)
  // ↑ DELETE http://localhost:8080/api/clients/1
  // client delete చేయడానికి
}