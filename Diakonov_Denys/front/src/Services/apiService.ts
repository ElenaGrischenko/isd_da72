import { AuthData, RegisterFormData, UserData, LessonData } from './interfaces'

export default class ApiService {
    apiBase = 'https://lab-templates.herokuapp.com/api/'

    // getResource = async (url: string) => {
    //     const res = await fetch(`${this.apiBase}${url}`)

    //     if (!res.ok) {
    //         const e: string = await res.text()
    //         throw new Error(e)
    //     }
    //     return await res.json()
    // }

    getSecureResource = async (url: string, token: string) => {
        const res = await fetch(`${this.apiBase}${url}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })

        if (!res.ok) {
            const e: string = await res.text()
            throw new Error(e)
        }
        return await res.json()
    }

    deleteSecureResource = async (url: string, token: string) => {
        const res = await fetch(`${this.apiBase}${url}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
            },
        })

        if (!res.ok) {
            const e: string = await res.text()
            throw new Error(e)
        }
        return res
    }

    postData = async (url: string, data: any) => {
        const res = await fetch(`${this.apiBase}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const e: string = await res.text()
            throw new Error(e)
        }
        return await res.json()
    }

    postSecureData = async (url: string, token: string, data: any) => {
        const res = await fetch(`${this.apiBase}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const e: string = await res.text()
            throw new Error(e)
        }
        return await res.json()
    }

    // patchSecureData = async (url: string, token: string, data: any) => {
    //     const res = await fetch(`${this.apiBase}${url}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Token ${token}`,
    //         },
    //         body: JSON.stringify(data),
    //     })

    //     if (!res.ok) {
    //         const e: string = await res.text()
    //         throw new Error(e)
    //     }
    //     return await res.json()
    // }

    getToken = async (email: string, password: string) => {
        const res = await this.postData(`auth/`, { username: email, password })
        return res as AuthData
    }

    postRegister = async (data: RegisterFormData) => {
        const res = await this.postData(`auth/register/`, data)
        return res as UserData
    }

    getLessons = async (token: string) => {
        const res = await this.getSecureResource(`lessons/`, token)
        return res as LessonData[]
    }

    deleteLesson = async (token: string, id: string | number) => {
        return await this.deleteSecureResource(
            `lessons/${id}/disconnect/`,
            token
        )
    }

    refreshLessons = async (token: string) => {
        const res = await this.getSecureResource(`lessons/update/`, token)
        return res as LessonData[]
    }

    createLesson = async (token: string, name: string) => {
        const res = await this.postSecureData(`lessons/`, token, {
            name,
        })
        return res as LessonData
    }
}
