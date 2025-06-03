'use client'

import Image from 'next/image';
import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import '@/css/index.css';
import { useEffect, useState } from 'react';
import { RawStation } from '@/type/map';
import { GetLocationById } from '@/lib/api/map';
import Header from '@/component/Header';

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
    </div>
    </div>
  );
}