import React from 'react'
import Header from '../Components/Main/Header/Header'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LessonTable from '../Components/Main/LessonTable/LessonTable'

const MainPage: React.FC<InjectedProps> = ({ isLoggedIn }) => {
    if (!isLoggedIn) return <Redirect to='/login' />

    return (
        <>
            <Header />
            <LessonTable />
        </>
    )
}

interface InjectedProps {
    isLoggedIn: boolean | null
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

export default connect(mapStateToProps)(MainPage)
