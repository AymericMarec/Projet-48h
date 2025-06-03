'use client'

import Image from 'next/image';
import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import StatusStations from "@/component/statusStations";
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
      {/* <Map></Map> */}
      <SearchStation />
      <FindMyPath />
    </div>
  );
}
