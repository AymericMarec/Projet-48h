'use client'

import { useState, useEffect } from 'react';
import { User, LoginResponse } from "@/type/log";
import { Register } from "@/lib/api/login";
import { useRouter } from 'next/navigation';
import '@/css/auth.css';

export default function RegisterPage() {
    const router = useRouter();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsFormValid(
            nom.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            password === confirmPassword
        );
        if (password !== confirmPassword && confirmPassword !== '') {
            setError('Les mots de passe ne correspondent pas.');
        } else {
            setError('');
        }
    }, [nom, email, password, confirmPassword]);

    const handleRegister = async (e: any) => {
        e.preventDefault();
        const user: User = {
            name: nom,
            email,
            password,
        };
        const LoginResponse = await Register(user);
        if (LoginResponse?.success) {
            router.push('/login');
        }
        setError(LoginResponse?.message || '');
    };

    return (
        <div className="login-bg">
            <div className="login-decoration-blue" />
            <div className="login-decoration-lime" />
            <div className="login-decoration-pink" />
            <div className="login-container">
                <img
                    src="/img/logo-levelotbm.png"
                    alt="Logo Le Vélo TBM"
                    className="tbm-logo"
                />
                <h2 className="login-title">Créer votre compte</h2>
                <form onSubmit={handleRegister} className="login-form">
                    <label className="login-label">Nom</label>
                    <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                            name="nom"
                            type="text"
                            placeholder="Votre nom..."
                            className="input-field"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <label className="login-label">Adresse mail</label>
                    <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input
                            name="email"
                            type="email"
                            placeholder="Votre adresse mail..."
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <label className="login-label">Mot de passe</label>
                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            name="password"
                            type="password"
                            placeholder="Votre mot de passe..."
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <label className="login-label">Confirmer le mot de passe</label>
                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirmez votre mot de passe..."
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button type="submit" className="btn-grey" disabled={!isFormValid}>
                        Créer mon compte
                    </button>
                    <button
                        type="button"
                        className="btn-blue"
                        onClick={() => router.push('/login')}
                    >
                        J'ai déjà un compte
                    </button>
                </form>
            </div>
        </div>
    );
}
