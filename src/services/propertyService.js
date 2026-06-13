import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export const getAllProperties = () => API.get('/properties')
export const getPropertyById = (id) => API.get(`/properties/${id}`)
export const createProperty = (data) => API.post('/properties', data)
export const updateProperty = (id, data) => API.put(`/properties/${id}`, data)
export const deleteProperty = (id) => API.delete(`/properties/${id}`)