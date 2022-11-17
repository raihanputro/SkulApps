import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID } from "../constants/actionTypes";

const schoolReducers =  (state = { isLoading: true, schools: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                schools: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage
            }; 
        case FETCH_BY_SEARCH:
            return {
                ...state,
                schools: action.payload,
            };
        case FETCH_BY_ID:
            return {
                ...state,
                school: action.payload.school,
            };
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE:
            return { 
                ...state, 
                schools: [...state.schools, action.payload] 
            };
        case UPDATE:
            return {
                ...state,
                schools: state.schools.map((school) => (school._id === action.payload._id ? action.payload : school))
            };
        case DELETE: 
            return {
                ...state,
                schools: state.schools.filter((school) => school._id !== action.payload)
            };
        case LIKE: 
            return {
                ...state,
                schools: state.schools.map((school) => (school._id === action.payload._id ? action.payload : school))
            };
        default:
            return state;
    }
}

export default schoolReducers;