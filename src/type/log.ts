export interface User{
    name: string|null,
    email:string,
    password:string
}

export interface LoginResponse {
    success: boolean,
    message: string
}