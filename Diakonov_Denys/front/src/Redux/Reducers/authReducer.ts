import { AUTH_LOGOUT, AUTH_SUCCESS } from '../Actions/actionTypes'
import { Action } from '../interfaces'

interface authReducerState {
    token: string
    name: string
    email: string
    isLoggedIn: boolean | null
}

const initialState: authReducerState = {
    token: '',
    name: '',
    email: '',
    isLoggedIn: null,
}

export default function authReducer(
    state = initialState,
    action: Action
): authReducerState {
    switch (action.type) {
        case AUTH_LOGOUT:
            return { ...initialState, isLoggedIn: false }
        case AUTH_SUCCESS:
            return {
                token: action.payload.token,
                name: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true,
            }
        default:
            return state
    }
}
