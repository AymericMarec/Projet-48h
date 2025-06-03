'use client'

import Image from 'next/image';
import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import '@/css/index.css';
import { useEffect, useState } from 'react';
import { RawStation } from '@/type/map';
import { GetLocationById } from '@/lib/api/map';
import Header from '@/component/Header';
import DisplayFav from '@/component/FavComponent';
import StatusStations from '@/component/statusStations';

export default function Home() {

  const [favs,setfavs] = useState<RawStation[] | null>(null)


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
    <div>
    <Header/>
    <div className="index-root">

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
      {/* SECTION FAVORIS */}
      <section className="fav-section">
        {favs && favs.length > 0 && (
          <div className="fav-title">
            <span className="fav-star">⭐</span>
            <span className="fav-title-text">Vos favoris :</span>
          </div>
        )}
        <div className="fav-grid">
          {favs && favs.map((station, index) => (
            <DisplayFav key={station._id} id={station._id}/>
          ))}
        </div>
      </section>
      {/* SECTION ETAT DES STATIONS */}
      <section className="stations-section">
        <div className="stations-section-left">
          <div className="stations-icon-bg">
            <img src="/img/icon-leVélo-circle.svg" alt="Le Vélo" width={64} height={64} />
          </div>
          <div className="stations-section-content">
            <h2 className="stations-section-title">L'état des stations aujourd'hui</h2>
            <p className="stations-section-desc">Pour voyager en toute sérénité, consultez l'info trafic du réseau et le détail de votre ligne !</p>
            <button className="stations-section-btn" onClick={() => window.location.href = `/disruptions`}>Voir tout le réseau TBM</button>
          </div>
        </div>
        <div className="stations-section-right">
          <StatusStations />
        </div>
      </section>
      {/* SECTION PLAN DYNAMIQUE */}
      <section className="dynamic-map-section">
        <div className="dynamic-map-left">
          <div className="dynamic-map-img-wrapper">
            <img src="/img/image_map.svg" alt="Plan dynamique" className="dynamic-map-img" />
            <a href="/map" className="dynamic-map-btn">Voir le plan</a>
          </div>
        </div>
        <div className="dynamic-map-right">
          <h2 className="dynamic-map-title">Le plan dynamique</h2>
          <p className="dynamic-map-desc">
            Pour consulter l'ensemble des stations Le Vélo et leurs disponibilités<br />
            Pour découvrir l'offre de transport autour d'une adresse, d'une commune ou d'un point d'intérêt
          </p>
        </div>
      </section>
    </div>
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/img/logo-levelotbm.png" alt="Le Vélo par TBM" className="footer-logo" width={120} height={32} />
          <span className="footer-copyright">© {new Date().getFullYear()} Le Vélo par TBM</span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Mentions légales</a>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Accessibilité</a>
        </div>
      </div>
    </footer>
    </div>
  );
}