'use server'

import { User,LoginResponse, LoginData} from "@/type/log";
import { ApiError } from "next/dist/server/api-utils";

export async function Register(user:User) {
    const API_URL = process.env.API_URL
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        }),
    });

    console.log(response.status)
    var LoginResponse:LoginResponse | null = null;
    switch (response.status) {
        case 201:
            LoginResponse={success:true,message:"Connexion réussi"}
            break;
        case 400:
            LoginResponse={success:false,message:"Utilisateur deja existant"}
            break;
        case 500:
            LoginResponse={success:false,message:"Erreur serveur"}
            break;
        default:
            break;
    }

    return LoginResponse
}

export async function Login(user:User) {
    const API_URL = process.env.API_URL
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    });

    console.log(response.status)
    var LoginResponse:LoginResponse | null = null;
    switch (response.status) {
        case 200:
            LoginResponse={success:true,message:"Connexion réussi"}
            break;
        case 400:
            LoginResponse={success:false,message:"Mauvais identifiants"}
            break
        case 500:
            LoginResponse={success:false,message:"Erreur serveur"}
            break
        default:
            break;
    }
    console.log(LoginResponse)
    const data:LoginData = await response.json()
    return {LoginResponse,data}
}

