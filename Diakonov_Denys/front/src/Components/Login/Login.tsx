import React from 'react'

import './Login.sass'

import LoginForm from './LoginForm'
import { auth } from '../../Redux/Actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Login: React.FC<InjectedProps> = props => {
    const handleLogin = (values: { email: string; password: string }) => {
        props.auth(values.email, values.password)
    }

    if (props.isLoggedIn) return <Redirect to='/' exact />

    return (
        <div className='login-wrapper'>
            <div className='login-bg'>
                <h1>Lab templates</h1>
            </div>
            <div className='login-content'>
                <LoginForm handleForm={handleLogin} />
            </div>
        </div>
    )
}

interface InjectedProps {
    auth: (email: string, password: string) => void
    isLoggedIn: boolean
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email: string, password: string) =>
            dispatch(auth(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
