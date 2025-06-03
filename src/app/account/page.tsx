'use client'

import { useEffect, useState } from "react"
import { User } from "@/type/log"
import { GetInfoUser,RemoveUser,UpdateUser } from "@/lib/api/user"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AccountPage(){
    const [userData,setuserData] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState("")
    const [editedEmail, setEditedEmail] = useState("")
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

    const UpdateUserHandler = async () => {
        const token:string|null  = localStorage.getItem('auth_token');
        if (token === null){
            router.push("/login")
            return
        }
        if (userData) {
            const updatedUser: User = {
                ...userData,
                name: editedName || userData.name,
                email: editedEmail || userData.email,
            };
            await UpdateUser(token, updatedUser);
            setuserData(updatedUser);
            setIsEditing(false);
        }                
    }

    const startEditing = () => {
        if (userData) {
            setEditedName(userData.name || "")
            setEditedEmail(userData.email || "")
            setIsEditing(true)
        }
    }

    const Deconnect = ()=>{
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        router.push("/")
    }

    return (
        <div>
            <button onClick={Deconnect}>Se déconnecter</button>
            <h2>email :</h2>
                {loadingUser ? (
                    <div style={{ width: '200px', height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }} />
                ) : isEditing ? (
                    <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                ) : (
                    <p>{userData?.email} </p>
                )}

            <h2>name :</h2>
                {loadingUser ? (
                    <div style={{ width: '200px', height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }} />
                ) : isEditing ? (
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
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
                    {!isEditing ? (
                <button onClick={()=>startEditing()}>Modifier mes informations</button>
            ) : (
                <div>
                    <button onClick={()=>UpdateUserHandler()}>Sauvegarder</button>
                    <button onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
            )}
                <button onClick={()=>DeleteUserHandler()}>Supprimer</button>
        </div>
        )
}