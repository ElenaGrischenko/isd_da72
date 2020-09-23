import { Action } from '../interfaces'
import { LessonData } from '../../Services/interfaces'
import { SET_LESSONS } from '../Actions/actionTypes'

interface lessonReducerState {
    list: LessonData[]
}

const initialState: lessonReducerState = {
    list: [],
}

export default function lessonReducer(
    state = initialState,
    action: Action
): lessonReducerState {
    switch (action.type) {
        case SET_LESSONS:
            return { ...state, list: action.payload }
        default:
            return state
    }
}
