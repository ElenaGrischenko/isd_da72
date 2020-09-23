import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import lessonReducer from './lessonsReducer'

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    lessons: lessonReducer,
})

export default rootReducer
