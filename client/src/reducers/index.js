import {ON_SIGN_IN, ON_SIGN_UP, ON_USER_DASHBOARD_LOADED, ON_SIGN_OUT} from "../action-types"

const initialState = {
    token: null,
    userId: null,
    login: {},
    logout: {},
    isAuthenticated: false,
    role: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_SIGN_IN: {
            return {...state,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: !state.isAuthenticated}
        }
        case ON_SIGN_UP: {

        }
        case ON_USER_DASHBOARD_LOADED: {

        }
        case ON_SIGN_OUT: {
            return {...state,
                token: null,
                userId: null,
                isAuthenticated: !state.isAuthenticated}
        }
        default:
            return state
    }
}