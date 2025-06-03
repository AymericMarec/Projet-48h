'use client'

import { User,LoginResponse } from "@/type/log";
import { Login } from "@/lib/api/login"
import { useRouter } from 'next/navigation';
import '@/css/auth.css';

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

        console.log(LoginResponse?.message)

    };

  return (
    <div className="login-bg">
      <div className="login-decoration-blue" />
      <div className="login-decoration-lime" />
      <div className="login-decoration-pink" />
      <div className="login-container">
        <div className="tbm-logo">
        <img
            src="/img/logo-levelotbm.png"
            alt="Logo LeTBM"
            className="tbm-logo w-32 h-auto mb-4"
        />
        </div>
        <h2 className="login-title">Connectez-vous avec</h2>
        <h3 className="login-subtitle">votre compte TBM !</h3>
        <form onSubmit={handleLogin} className="login-form" action="#">
          <label className="login-label">Adresse mail</label>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input name="email" type="email" placeholder="Votre adresse mail..." className="input-field" required />
          </div>
          <label className="login-label">Mot de passe</label>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input name="password" type="password" placeholder="Votre mot de passe..." className="input-field" required />
          </div>
          <a href="#" className="forgot-link">Mot de passe oublié ?</a>
          <button type="submit" className="btn-grey">Connexion</button>
          <button type="button" className="btn-blue" onClick={() => router.push('/register')}>Créer mon compte</button>
        </form>
      </div>
    </div>
  );
}
