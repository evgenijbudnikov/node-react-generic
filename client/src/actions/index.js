import {ON_SIGN_IN, ON_SIGN_UP, ON_USER_DASHBOARD_LOADED, ON_SIGN_OUT} from "../action-types"

export const onSignIn = (payload) => ({type: ON_SIGN_IN, payload})
export const onSignUp = (payload) => ({type: ON_SIGN_UP, payload})
export const onUserDashboardLoaded = (payload) => ({type: ON_USER_DASHBOARD_LOADED, payload})
export const onSignOut = () => ({type: ON_SIGN_OUT})