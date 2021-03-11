import {ON_SIGN_IN, ON_SIGN_UP, ON_USER_DASHBOARD_LOADED, ON_SIGN_OUT} from "../action-types"

const storageName = 'userData'
const data = JSON.parse(localStorage.getItem(storageName))

const initialState = {
    token: (data && data.token) ? data.token : null,
    userId: data ? data.userId : null,
    login: {},
    logout: {},
    isAuthenticated: (data) ? true : false,
    role: null
}

//console.log(data)
//console.log('isAuthenticated: ' +data.isAuthenticated)

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