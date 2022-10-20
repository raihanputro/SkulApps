import axios from 'axios';

const url = 'http://localhost:5000/schools';

export const fetchSchools = () => axios.get(url);
export const createSchool = (newSchool) => axios.post(url, newSchool);
export const updateSchool = (id, updatedSchool) => axios.patch(`${url}/${id}`, updatedSchool);
export const deleteSchool = (id) => axios.delete(`${url}/${id}`);
export const likeSchool = (id) => axios.patch(`${url}/${id}/likeSchool`);