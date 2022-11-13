import axios from 'axios';


const urlSchools = 'http://localhost:5000/schools';

export const fetchSchools = () => axios.get(urlSchools);
export const createSchool = (newSchool) => axios.post(urlSchools, newSchool);
export const updateSchool = (id, updatedSchool) => axios.patch(`${urlSchools}/${id}`, updatedSchool);
export const deleteSchool = (id) => axios.delete(`${urlSchools}/${id}`);
export const likeSchool = (id) => axios.patch(`${urlSchools}/${id}/likeSchool`);

