import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchSchool = (id) => API.get(`/schools/${id}`);
export const fetchSchools = (page) => API.get(`/schools?page=${page}`);
export const fetchSchoolsBySearch = (searchQuery) => API.get(`/schools/search?searchQuery=${searchQuery.search || null}&tags=${searchQuery.tags}`);
export const createSchool = (newSchool) => API.post('/schools', newSchool);
export const updateSchool = (id, updatedSchool) => API.patch(`/schools/${id}`, updatedSchool);
export const deleteSchool = (id) => API.delete(`/schools/${id}`);
export const likeSchool = (id) => API.patch(`/schools/${id}/likeSchool`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
