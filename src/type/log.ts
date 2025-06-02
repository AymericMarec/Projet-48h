export interface User{
    id?:string|null,
    name: string|null,
    email:string,
    password?:string|null,
    profilpicture?:string|null
}

export interface LoginResponse {
    success: boolean,
    message: string
}

export interface LoginData {
    token:string
    user:User
}
