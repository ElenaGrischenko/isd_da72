import React from 'react'

import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form'
import renderField from '../Helpers/FormField'
import { Link } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'

const validate = values => {
    const errors = {} as FormErrors<any>
    if (!values.name) {
        errors.name = 'Необхідно'
    }
    if (!values.group) {
        errors.group = 'Необхідно'
    }
    if (!values.gender) {
        errors.gender = 'Необхідно'
    }
    if (!values.variant) {
        errors.variant = 'Необхідно'
    }
    if (!values.password) {
        errors.password = 'Необхідно'
    }
    if (!values.password2) {
        errors.password2 = 'Необхідно'
    } else if (values.password !== values.password2) {
        errors.password = 'Необхідно щоб паролі збігалися'
        errors.password2 = 'Необхідно щоб паролі збігалися'
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

const ReduxFormSelect = props => {
    const {
        input,
        meta: { touched, error, warning },
    } = props
    return (
        <>
            <Select
                {...input}
                onChange={value => input.onChange(value)}
                onBlur={e => {
                    e.preventDefault()
                }}
                options={[
                    { label: 'Чоловіча', value: 'm' },
                    { label: 'Жіноча', value: 'f' },
                ]}
                styles={{
                    control: styles => ({
                        ...styles,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '18px',
                    }),
                    option: styles => ({ ...styles, color: '#000' }),
                }}
                placeholder='Стать'
            />
            {touched &&
                ((error && <span className={'error'}>{error}</span>) ||
                    (warning && <span className={'error'}>{warning}</span>))}
        </>
    )
}

const ReduxFormAsyncSelect = props => {
    const {
        input,
        loadOptions,
        meta: { touched, error, warning },
    } = props
    console.log(input)
    return (
        <>
            <AsyncSelect
                {...input}
                onChange={value => input.onChange(value)}
                onBlur={e => {
                    e.preventDefault()
                }}
                loadOptions={loadOptions}
                styles={{
                    control: styles => ({
                        ...styles,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '18px',
                    }),
                    option: styles => ({ ...styles, color: '#000' }),
                }}
                placeholder='Група'
            />
            {touched &&
                ((error && <span className={'error'}>{error}</span>) ||
                    (warning && <span className={'error'}>{warning}</span>))}
        </>
    )
}

const RegisterForm: React.FC<
    InjectedFormProps<any, OwnProps> & OwnProps
> = props => {
    const { handleSubmit, handleForm } = props

    const loadOptions = async (inputValue: string) => {
        const res = await fetch(
            `https://api.rozklad.org.ua/v2/groups/?search={'query':'${inputValue}'}`
        )
        const resJson = await res.json()
        if (resJson)
            return resJson.data.map(obj => ({
                label: obj.group_full_name,
                value: obj.group_id,
            }))
        else return []
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} className='login-form'>
            <h2>Реєстрація</h2>
            <Field
                id='email'
                name='email'
                component={renderField}
                type='email'
                placeholder='Email'
                label='Email'
            />
            <Field
                id='name'
                name='name'
                component={renderField}
                type='text'
                placeholder='Прізвище + ініціали'
                label='Прізвище + ініціали'
            />
            <div className='input-field'>
                <label htmlFor='gender' className='active'>
                    Стать
                </label>
                <Field name='gender' component={ReduxFormSelect} />
            </div>
            <div className='input-field'>
                <label htmlFor='group' className='active'>
                    Група
                </label>
                <Field
                    name='group'
                    component={ReduxFormAsyncSelect}
                    loadOptions={loadOptions}
                />
            </div>
            <Field
                id='variant'
                name='variant'
                component={renderField}
                type='number'
                placeholder='Варіант'
                label='Варіант'
            />
            <Field
                id='password'
                name='password'
                component={renderField}
                type='password'
                placeholder='Пароль'
                label='Пароль'
            />
            <Field
                id='password2'
                name='password2'
                component={renderField}
                type='password'
                placeholder='Підтвердження пароля'
                label='Підтвердження пароля'
            />
            <div className='form-btns'>
                <button type='submit'>Зареєструватися</button>
            </div>
            <div className='form-btns'>
                <Link to='/login'>Маєте аккаунт? Увійти</Link>
            </div>
        </form>
    )
}

export default reduxForm<any, OwnProps>({ form: 'register', validate })(
    RegisterForm
)
