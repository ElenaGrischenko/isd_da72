import React from 'react'

const renderField = ({
    input,
    placeholder,
    type,
    className,
    id,
    label,
    meta: { touched, error, warning },
}) => (
    <div className='input-field'>
        <label htmlFor={id} className='active'>
            {label}
        </label>
        <input
            {...input}
            placeholder={placeholder}
            id={id}
            type={type}
            className={
                touched && (error || warning)
                    ? 'validate input-error'
                    : 'validate'
            }
        />
        {touched &&
            ((error && <span className={'error'}>{error}</span>) ||
                (warning && <span className={'error'}>{warning}</span>))}
    </div>
)

export default renderField
