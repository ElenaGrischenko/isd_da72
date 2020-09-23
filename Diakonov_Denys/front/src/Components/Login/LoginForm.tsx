import React from 'react'

import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form'
import renderField from '../Helpers/FormField'
import { Link } from 'react-router-dom'

const validate = values => {
    const errors = {} as FormErrors<any>
    if (!values.password) {
        errors.password = 'Необхідно'
    }
    if (!values.email) {
        errors.email = 'Необхідно'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(values.email)) {
        errors.email = 'Некоректна поштова адреса'
    }
    return errors
}

interface OwnProps {
    handleForm: (value) => void
}

const LoginForm: React.FC<
    InjectedFormProps<any, OwnProps> & OwnProps
> = props => {
    const { handleSubmit, handleForm } = props
    return (
        <form onSubmit={handleSubmit(handleForm)} className='login-form'>
            <h2>Логін</h2>
            <Field
                id='email'
                name='email'
                component={renderField}
                type='email'
                placeholder='Email'
                label='Email'
            />
            <Field
                id='password'
                name='password'
                component={renderField}
                type='password'
                placeholder='Пароль'
                label='Пароль'
            />
            <div className='form-btns'>
                <button type='submit'>Увійти</button>
            </div>
            <div className='form-btns'>
                <Link to='/register'>Зареєструватися</Link>
            </div>
        </form>
    )
}

export default reduxForm<any, OwnProps>({ form: 'login', validate })(LoginForm)
