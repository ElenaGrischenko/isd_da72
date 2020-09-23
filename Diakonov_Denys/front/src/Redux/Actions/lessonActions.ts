import ApiService from '../../Services/apiService'
import { LessonData } from '../../Services/interfaces'
import { SET_LESSONS } from './actionTypes'

const {
    getLessons,
    deleteLesson,
    refreshLessons,
    createLesson,
} = new ApiService()

export function setLessons(lessons: LessonData[]) {
    return {
        type: SET_LESSONS,
        payload: lessons,
    }
}

export function loadLessons() {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const res = await getLessons(token)
            dispatch(setLessons(res))
        } catch (error) {
            console.log(error)
        }
    }
}

export function removeLesson(id: number) {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const res = await deleteLesson(token, id)
            dispatch(loadLessons())
        } catch (error) {
            console.log(error)
        }
    }
}

export function restoreLessons() {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const res = await refreshLessons(token)
            dispatch(setLessons(res))
        } catch (error) {
            console.log(error)
        }
    }
}

export function addLesson(name: string) {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            const res = await createLesson(token, name)
            dispatch(loadLessons())
        } catch (error) {
            console.log(error)
        }
    }
}
