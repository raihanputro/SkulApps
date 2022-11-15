import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchSchools = () => API.get('/schools');
export const createSchool = (newSchool) => API.post('/schools', newSchool);
export const updateSchool = (id, updatedSchool) => API.patch(`/schools/${id}`, updatedSchool);
export const deleteSchool = (id) => API.delete(`/schools/${id}`);
export const likeSchool = (id) => API.patch(`/schools/${id}/likeSchool`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
