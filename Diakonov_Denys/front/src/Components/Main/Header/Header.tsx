import React from 'react'
import { connect } from 'react-redux'

import './Header.sass'
import { logout } from '../../../Redux/Actions/authActions'

const Header: React.FC<InjectedProps> = ({ name, logout }) => {
    return (
        <header>
            <p className='title'>Lab Templates</p>
            <div className='control'>
                <p>Вітаємо, {name}</p>
                <button onClick={logout}>Вийти</button>
            </div>
        </header>
    )
}

interface InjectedProps {
    logout(): void
    name: string
}

function mapStateToProps(state) {
    return {
        name: state.auth.name,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
