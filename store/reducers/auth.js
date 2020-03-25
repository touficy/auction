import { SIGNUP, LOGIN, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    userId: null,
    userName: null,
    userEmail: null,
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return initialState;
        case AUTHENTICATE:
            return {
                userId: action.payload.userId,
                userEmail: action.payload.userEmail,
                token: action.payload.token,
            };
        case SIGNUP:
            return {
                userId: action.payload.userId,
                userName: action.payload.userName,
                userEmail: action.payload.userPhone,
                token: action.payload.userGender,
            };
        case LOGIN:
            return {
                token: action.payload.token,
                userId: action.payload.userId,
            };
        default:
            return state;
    }
};