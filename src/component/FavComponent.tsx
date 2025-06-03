'use client'

import { GetLocationById } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useEffect, useState } from "react"

interface FavDisplayProps{
    id:string
}

export default function DisplayFav(props:FavDisplayProps){
    const [Station,setStation] = useState<RawStation | null>(null)
    const [LoadingStation,setLoadingStation] = useState(true)

    useEffect(()=>{
        const FetchLocation = async ()=>{
            const data:RawStation = await GetLocationById(props.id)
            setStation(data)
            setLoadingStation(false)
        }
        FetchLocation()
    },[])
    if(!Station || LoadingStation){
        return <div style={{ width: '200px', height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }} />
    }

    return (
        <div className="fav-card">
            <a href={`/details/${Station._id}`} className="fav-card-title">
                <span className="fav-star">⭐</span>
                {Station.name[0].text}
            </a>
            <div style={{width: '90%', margin: '0 auto'}}>
                <div className="fav-card-content" style={{borderRadius: '24px'}}>
                    <div className="fav-card-content-block">
                        <img src="/img/icon-leVélo.svg" alt="vélo" className="fav-card-icon" />
                        <span className="fav-card-value">{Station.num_vehicles_available}</span>
                        <span className="fav-card-label">vélos</span>
                    </div>
                    <div className="fav-card-content-block">
                        <img src="/img/icon-station-v3-raccrocher.svg" alt="places restantes" className="fav-card-icon" />
                        <span className="fav-card-value">{Station.num_docks_available}</span>
                        <span className="fav-card-label">places restantes</span>
                    </div>
                    <div className="fav-card-content-block">
                        <img src="/img/icon-abri-velo.svg" alt="capacité" className="fav-card-icon" />
                        <span className="fav-card-value">{Station.capacity}</span>
                        <span className="fav-card-label">capacité</span>
                    </div>
                </div>
            </div>
        </div>
    )
}