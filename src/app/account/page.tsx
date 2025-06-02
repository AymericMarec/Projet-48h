'use client'

import { useEffect, useState } from "react"
import { User } from "@/type/log"
import { GetInfoUser,RemoveUser } from "@/lib/api/user"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AccountPage(){
    const [userData,setuserData] = useState<User | null>(null)
    const [loadingUser,setloadingUser] = useState(true)
    const router = useRouter();

    useEffect(()=>{
        const fetchUserData = async () =>{
            const token:string|null  = localStorage.getItem('auth_token');
            if (token === null){
                router.push("/login")
                return
            }
            const user = await GetInfoUser(token)
            setuserData(user)
            setloadingUser(false)
        }
        fetchUserData()
    },[])

    const DeleteUserHandler = async () => {
        const token:string|null  = localStorage.getItem('auth_token');
        if (token === null){
            router.push("/login")
            return
        }
        await RemoveUser(token)
        router.push("/")
    }

    return (
        <div>
            <h2>email :</h2>
                {loadingUser ? (
                    <div style={{ width: '200px', height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }} />
                ) : (
                    <p>{userData?.email}</p>
                )}

            <h2>name :</h2>
                {loadingUser ? (
                    <div style={{ width: '200px', height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }} />
                ) : (
                    <p>{userData?.name}</p>
                )}
            <h2>profil picture</h2>
                {loadingUser ? (
                    <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc', borderRadius: '4px' }} />
                ) : (
                    <div>
                        <Image 
                            src={userData?.profilpicture || ""}
                                alt="Profile picture"
                                width={100}
                                height={100}
                        />
                    </div>
                )}
                <button onClick={()=>DeleteUserHandler()}></button>
        </div>
        )
}