'use client'

import { User,LoginResponse } from "@/type/log";
import { Login } from "@/lib/api/login"
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (e:any) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const user:User = {
            name : formData.get('nom') as string,
            email: formData.get('email') as string,
            password : formData.get('password') as string

        }
        const {LoginResponse,data} = await Login(user)
        console.log(LoginResponse)
        if(LoginResponse?.success){
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user',JSON.stringify(data.user) );
            router.push('/');
        }

        //afficher le message d'erreur 
        console.log(LoginResponse?.message)

    };

  return (
    <div>
        <form onSubmit={handleLogin}>
            <p>email</p>
            <input name="email" type="email"/>
            <p>password</p>
            <input name="password" type="password"/>
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}
