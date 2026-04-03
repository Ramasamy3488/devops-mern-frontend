import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/api/v1/employees`;

export const getEmployees = () => axios.get(API);
export const getEmployeeById = (id) => axios.get(`${API}/${id}`);
export const createEmployee = (data) => axios.post(API, data);
export const updateEmployee = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API}/${id}`);
