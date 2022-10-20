import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

export default (schools = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [ ...schools, action.payload ];
        case UPDATE:
            return schools.map((school) => (school._id === action.payload._id ? action.payload : school));
        case DELETE: 
            return schools.filter((school) => school._id !== action.payload);
        case LIKE: 
            return schools.map((school) => (school._id === action.payload._id ? action.payload : school));
        default:
            return schools;
    }
}