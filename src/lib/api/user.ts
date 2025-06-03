'use server'
import { User,LoginResponse, LoginData} from "@/type/log";

export async function GetInfoUser(token:string) {
    const API_URL = process.env.API_URL
    const IMAGE_URL = API_URL+"/uploads/profile-pictures/"
    const response = await fetch(`${API_URL}/my-account`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json()
    const user:User = {
        id:data.user.id,
        email:data.user.email,
        name:data.user.name,
        profilpicture:IMAGE_URL+data.user.profilePicture
    }
    return user
}

export async function RemoveUser(token:string) {
    const API_URL = process.env.API_URL
    await fetch(`${API_URL}/my-account/delete`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
}

export async function UpdateUser(token:string, user:User) {
    const API_URL = process.env.API_URL
    const response = await fetch(`${API_URL}/my-account/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            profilePicture: user.profilpicture,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const data = await response.json();
    return data;
}