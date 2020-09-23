import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'
import ApiService from '../../Services/apiService'
import { RegisterFormData } from '../../Services/interfaces'

const { getToken, postRegister } = new ApiService()

export function logout() {
    localStorage.clear()
    return {
        type: AUTH_LOGOUT,
    }
}

export function authSuccess(token: string, email: string, name: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('name', name)
    return {
        type: AUTH_SUCCESS,
        payload: { token, email, name },
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('email')
        const name = localStorage.getItem('email')
        if (token === null) {
            dispatch(logout())
        } else dispatch(authSuccess(token, email, name))
    }
}

export function auth(email, password) {
    return async dispatch => {
        try {
            const data = await getToken(email, password)
            dispatch(authSuccess(data.token, email, data.name))
        } catch (error) {
            dispatch({
                type: '@@redux-form/STOP_SUBMIT',
                meta: {
                    form: 'login',
                },
                payload: {
                    email: 'Некоректний email або пароль',
                    password: 'Некоректний email або пароль',
                    _error: 'Invalid data',
                },
                error: true,
            })
        }
    }
}

export function register(data: RegisterFormData) {
    return async dispatch => {
        try {
            const res = await postRegister(data)
            dispatch(authSuccess(res.token, res.email, res.name))
        } catch (error) {
            const errBody = JSON.parse(error.message)
            setTimeout(
                () =>
                    dispatch({
                        type: '@@redux-form/STOP_SUBMIT',
                        meta: {
                            form: 'register',
                        },
                        payload: {
                            ...Object.keys(errBody)
                                .map(key => ({
                                    key: key,
                                    value: errBody[key].join(' '),
                                }))
                                .reduce(
                                    (obj, item) => (
                                        (obj[item.key] = item.value), obj
                                    ),
                                    {}
                                ),
                            _error: 'Invalid data',
                        },
                        error: true,
                    }),
                15
            )
        }
    }
}
