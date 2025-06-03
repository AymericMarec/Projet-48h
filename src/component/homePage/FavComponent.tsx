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
        <div>
            {/* afficher les donnnées */}
        </div>
    )
}