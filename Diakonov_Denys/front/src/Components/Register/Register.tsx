import React from 'react'

import './Register.sass'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { RegisterFormData, ReduxRegisterForm } from '../../Services/interfaces'
import { register } from '../../Redux/Actions/authActions'

const Register: React.FC<InjectedProps> = props => {
    if (props.isLoggedIn) return <Redirect to='/' exact />

    return (
        <div className='login-wrapper reg-wrapper'>
            <div className='login-bg reg-bg'>
                <h1>Lab templates</h1>
            </div>
            <div className='login-content'>
                <RegisterForm
                    handleForm={(data: ReduxRegisterForm) =>
                        props.register({
                            email: data.email,
                            name: data.name,
                            gender: data.gender.value,
                            group_id: data.group.value,
                            group_name: data.group.label.toUpperCase(),
                            password: data.password,
                            password2: data.password2,
                            variant: parseInt(data.variant),
                        })
                    }
                />
            </div>
        </div>
    )
}

interface InjectedProps {
    register(data: RegisterFormData): void
    isLoggedIn: boolean
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data: RegisterFormData) => dispatch(register(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
