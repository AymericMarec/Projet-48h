'use client'

import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import { useEffect, useState } from "react";
import DisplayFav from "@/component/homePage/FavComponent";
import { GetLocationById } from "@/lib/api/map";
import { RawStation } from "@/type/map";

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
      {/* favoris */}
      <div>
          {favs && favs.map((station, index) => (
            <DisplayFav key={station._id} id={station._id}/>
          ))}
      </div>

      <SearchStation />
      <FindMyPath />
    </div>
  );
}
