export interface AuthData {
    token: string
    name: string
    email: string
}

export interface RegisterFormData {
    email: string
    name: string
    gender: 'm' | 'f'
    group_id: number
    group_name: string
    variant: number
    password: string
    password2: string
}

export interface UserData {
    id: number
    email: string
    name: string
    gender: 'm' | 'f'
    group_id: number
    group_name: string
    variant: number
    token: string
}

export interface ReduxRegisterForm {
    email: string
    gender: { label: 'Чоловіча'; value: 'm' } | { label: 'Жіноча'; value: 'f' }
    group: { label: string; value: number }
    name: string
    password: string
    password2: string
    variant: string
}

export interface LessonData {
    id: number
    name: string
}
