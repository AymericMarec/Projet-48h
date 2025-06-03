'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import '@/css/index.css';

type HeaderProps = {
  currentPage?: string;
};

export default function Header({ currentPage = '' }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <>
      <header className="index-header">
        <div className="index-header-left">
          <Image
            src="/img/logo-levelotbm.png"
            alt="Le Vélo par TBM"
            width={220}
            height={60}
            className="index-logo"
          />
          <nav className="index-nav">
            <a href="#" className="index-nav-item">Se déplacer</a>
            <a href="#" className="index-nav-item">Tarifs</a>
            <a href="#" className="index-nav-item">Toute l'offre TBM</a>
          </nav>
        </div>
        <div className="index-header-right">
          <a href={isLoggedIn ? "/account" : "/login"} className="index-login">
            <span className="index-login-icon-svg">
              {/* Icône utilisateur verte Material */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#4ec3b6" />
                <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#4ec3b6" />
              </svg>
            </span>
            {isLoggedIn ? 'Mon compte' : 'Me connecter'}
          </a>
          <span className="index-lang-fr-svg">
            {/* Drapeau français */}
            <svg width="22" height="16" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="7.33" height="16" fill="#002654" />
              <rect x="7.33" width="7.33" height="16" fill="#fff" />
              <rect x="14.66" width="7.34" height="16" fill="#ce1126" />
            </svg>
          </span>
        </div>
      </header>
      {currentPage && (
        <header className="index-header">
          <div className="index-header-left">
            <a href="/" className="header-current-page_text">{'❰ '}{currentPage}</a>
          </div>
        </header>
      )}
    </>
  );
}
