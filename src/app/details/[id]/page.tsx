"use client"

import { GetLocationById } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import Map from "@/component/mapPage/Map"
import dynamic from 'next/dynamic'


export default function Details(){
    const Map = dynamic(() => import('@/component/mapPage/Map'), {
        ssr: false,
    })

    const params = useParams()
    const id = params.id as string

    const [Station,setStation] = useState<RawStation | null>(null)
    const [LoadingStation,setLoadingStation] = useState(true)
    const [isFav,setFav] = useState(false)
    useEffect(()=>{
        const FetchLocation = async ()=>{
            const data:RawStation = await GetLocationById(id)
            setStation(data)
            setLoadingStation(false)
        }
        FetchLocation()
    },[])

    useEffect(()=>{
        const favRaw = localStorage.getItem('fav');
        const favArray = favRaw ? JSON.parse(favRaw) : [];
        const id = Station?._id
        if(favArray.includes(id)){
            setFav(true)
        }
    },[])

    const toggleFav = () => {
        const favRaw = localStorage.getItem('fav');
        const favArray = favRaw ? JSON.parse(favRaw) : [];

        if (isFav) {
            const updatedFav = favArray.filter((favId:string) => favId !== id);
            localStorage.setItem('fav', JSON.stringify(updatedFav));
            setFav(false);
        } else {
            favArray.push(id);
            localStorage.setItem('fav', JSON.stringify(favArray));
            setFav(true);
        }
    };

    return(
        <div>
            <div>{Station?.address}</div>
        
            <Map id={id} zoom={12}></Map>
            <button onClick={toggleFav}>
                {isFav ? 'Retirer fav' : 'Ajouter fav'}
            </button>

        </div>
    )
}