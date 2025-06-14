'use client'

import { useEffect, useState } from "react"
import { User } from "@/type/log"
import { GetInfoUser,RemoveUser,UpdateUser } from "@/lib/api/user"
import { useRouter } from 'next/navigation';
import '@/css/auth.css' 
import Image from 'next/image';
import Header from '@/component/Header';

export default function AccountPage(){
    const [userData,setuserData] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState("")
    const [editedEmail, setEditedEmail] = useState("")
    const [loadingUser,setloadingUser] = useState(true)
    const router = useRouter();

    useEffect(()=>{
        // Empêcher le défilement
        document.body.style.overflow = 'hidden';
        
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
                profilpicture: userData.profilpicture,
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
        // Réactiver le défilement lors de la déconnexion
        document.body.style.overflow = 'auto';
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        router.push("/")
    }

    // Nettoyer le style lors du démontage du composant
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <Header currentPage="Mon compte" />
            <div className="login-bg" style={{ height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
                <div className="login-decoration-blue" />
                <div className="login-decoration-lime" />
                <div className="login-decoration-pink" />
                <div className="login-container" style={{ marginTop: '-5rem' }}>
                    <img src="/img/logo-levelotbm.png" alt="Le Vélo par TBM" className="tbm-logo" />
                    <h2 className="login-title" style={{marginBottom: 0}}>Mon compte</h2>
               
                    <form className="login-form" style={{marginTop: '2rem'}}>
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    placeholder="Nom"
                                    required
                                />
                            ) : (
                                <input
                                    type="text"
                                    className="input-field"
                                    value={userData?.name || ''}
                                    disabled
                                />
                            )}
                        </div>
                        <div className="input-group">
                            <span className="input-icon">✉️</span>
                            {isEditing ? (
                                <input
                                    type="email"
                                    className="input-field"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            ) : (
                                <input
                                    type="email"
                                    className="input-field"
                                    value={userData?.email || ''}
                                    disabled
                                />
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                            {!isEditing ? (
                                <>
                                    <button type="button" className="btn-grey" style={{flex: 1}} onClick={startEditing}>Modifier</button>
                                    <button type="button" className="btn-blue" style={{flex: 1, background: '#F45B69', color: '#fff'}} onClick={Deconnect}>Me déconnecter</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn-grey" style={{flex: 1}} onClick={UpdateUserHandler}>Sauvegarder</button>
                                    <button type="button" className="btn-blue" style={{flex: 1}} onClick={() => setIsEditing(false)}>Annuler</button>
                                    <button type="button" className="btn-blue" style={{flex: 1, background: '#d90429', color: '#fff'}} onClick={DeleteUserHandler}>Supprimer</button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}