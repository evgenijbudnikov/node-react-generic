import {
    ON_SIGN_IN,
    ON_SIGN_UP,
    ON_USER_DASHBOARD_LOADED,
    ON_SIGN_OUT,
    ON_ROLES_LOADED,
    ON_USERS_LOADED, ON_LOADING_PROGRESS, ON_LOADING
} from "../action-types"

const storageName = 'userData'
const data = JSON.parse(localStorage.getItem(storageName))

const initialState = {
    token: (data && data.token) ? data.token : null,
    userId: data ? data.userId : null,
    login: {},
    logout: {},
    isAuthenticated: (data) ? true : false,
    role: null,
    roleList: {},
    userList: {},
    progress: 0,
    loading: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_SIGN_IN: {
            return {...state,
                token: action.payload.token.token,
                userId: action.payload.userId,
                isAuthenticated: !state.isAuthenticated}
        }
        case ON_SIGN_UP: {

        }
        case ON_USER_DASHBOARD_LOADED: {

        }
        case ON_ROLES_LOADED: {
            return {...state,
                roleList: action.payload}
        }
        case ON_LOADING_PROGRESS: {
            return {...state,
                progress: action.payload}
        }
        case ON_LOADING: {
            return {...state,
                loading: action.payload}
        }
        case ON_USERS_LOADED: {
            return {...state,
                userList: action.payload.users}
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