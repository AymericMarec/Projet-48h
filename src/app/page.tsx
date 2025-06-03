'use client'

import Image from 'next/image';
import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import '@/css/index.css';
import { useEffect, useState } from 'react';
import { RawStation } from '@/type/map';
import { GetLocationById } from '@/lib/api/map';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favs,setfavs] = useState<RawStation[] | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  useEffect(() => {
    const fetchFavs = async () => {
      const favRaw = localStorage.getItem('fav');
      const favArray = favRaw ? JSON.parse(favRaw) : [];

      const stations = await Promise.all(
        favArray.map((id: string) => GetLocationById(id))
      );

      setfavs(stations);
    };

    fetchFavs();
  }, []);

  return (
    <div className="index-root">
      <header className="index-header">
        <div className="index-header-left">
          <Image src="/img/logo-levelotbm.png" alt="Le Vélo par TBM" width={220} height={60} className="index-logo" />
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
                <circle cx="12" cy="8" r="4" fill="#4ec3b6"/>
                <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#4ec3b6"/>
              </svg>
            </span>
            {isLoggedIn ? 'Mon compte' : 'Me connecter'}
          </a>
          <span className="index-lang-fr-svg">
            {/* Drapeau français */}
            <svg width="22" height="16" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="7.33" height="16" fill="#002654"/>
              <rect x="7.33" width="7.33" height="16" fill="#fff"/>
              <rect x="14.66" width="7.34" height="16" fill="#ce1126"/>
            </svg>
          </span>
        </div>
      </header>
      <main className="index-main">
        <div className="index-bg-overlay">
          <Image src="/img/velo_main.png" alt="Vélos" fill priority className="index-bg-img" />
        </div>
        <div className="index-main-content">
          <div className="index-hero-left">
            <h1 className="index-title">Les vélos en libre service,<br />partout, tout le temps.</h1>
          </div>
          <div className="index-hero-right">
            <div className="index-search-blocks">
              <div className="index-search-station">
                <div className="index-block-header">
                  <h2 className="index-block-title">TROUVER MA STATION</h2>
                </div>
                <div className="index-block-body">
                  <SearchStation />
                </div>
              </div>
              <div className="index-search-path">
                <div className="index-block-header">
                  <h2 className="index-block-title">RECHERCHER MON ITINÉRAIRE</h2>
                </div>
                <div className="index-block-body">
                  <FindMyPath />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
