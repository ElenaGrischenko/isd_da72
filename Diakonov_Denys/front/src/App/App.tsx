import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import './App.sass'

import MainPage from '../Pages/MainPage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'

import { autoLogin } from '../Redux/Actions/authActions'
import { connect } from 'react-redux'

const App: React.FC<InjectedProps> = props => {
    useEffect(props.autoLogin, [])

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
                <Route render={() => <Redirect to='/' />} />
            </Switch>
        </Router>
    )
}

interface InjectedProps {
    autoLogin: () => void
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    }
}

export default connect(null, mapDispatchToProps)(App)
