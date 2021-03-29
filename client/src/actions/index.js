import {
    ON_SIGN_IN,
    ON_SIGN_UP,
    ON_USER_DASHBOARD_LOADED,
    ON_SIGN_OUT,
    ON_ROLES_LOADED,
    ON_USERS_LOADED, ON_LOADING_PROGRESS, ON_LOADING
} from "../action-types"

export const onSignIn = (payload) => ({type: ON_SIGN_IN, payload})
export const onSignUp = (payload) => ({type: ON_SIGN_UP, payload})
export const onUserDashboardLoaded = (payload) => ({type: ON_USER_DASHBOARD_LOADED, payload})
export const onRolesLoaded = (payload) => ({type: ON_ROLES_LOADED, payload})
export const onUsersLoaded = (payload) => ({type: ON_USERS_LOADED, payload})
export const onLoadingProgress = (payload) => ({type: ON_LOADING_PROGRESS, payload})
export const onLoading = (payload) => ({type: ON_LOADING, payload})
export const onSignOut = () => ({type: ON_SIGN_OUT})