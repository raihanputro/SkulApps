import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export const getSchools = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSchools();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch(error) {
        console.log(error)
    }
};

export const createSchool = (post) => async (dispatch) => {
    try {
        const { data } = await api.createSchool(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updateSchool = (id, school) => async (dispatch) => {
    try {
        const { data } = await api.updateSchool(id, school);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const deleteSchool = (id) => async (dispatch) => {
    try {
        await api.deleteSchool(id);

        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likeSchool = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeSchool(id);

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}