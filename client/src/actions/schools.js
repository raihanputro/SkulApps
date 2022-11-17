import * as api from '../api';
import { FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_ID } from '../constants/actionTypes';

export const getSchool = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchSchool(id);

        dispatch({ type: FETCH_BY_ID, payload: {school: data}});
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getSchools = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchSchools(page);

        console.log(data);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.log(error)
    }
};

export const getSchoolsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchSchoolsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data  });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createSchool = (school) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createSchool(school);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
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