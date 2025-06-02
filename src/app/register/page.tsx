'use client'

import { User,LoginResponse } from "@/type/log";
import { Register } from "@/lib/api/login"

export default function RegisterPage() {
    const handleRegister = async (e:any) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const user:User = {
            name : formData.get('nom') as string,
            email: formData.get('email') as string,
            password : formData.get('password') as string

        }
        const LoginResponse = await Register(user)
        if(LoginResponse?.success){
            //redirect to main page
        }
        //afficher le message d'erreur 
        console.log(LoginResponse?.message)

    };

  return (
    <div>
        <form onSubmit={handleRegister}>
            <p>nom</p>
            <input name="nom"/>
            <p>email</p>
            <input name="email" type="email"/>
            <p>password</p>
            <input name="password" type="password"/>
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}
