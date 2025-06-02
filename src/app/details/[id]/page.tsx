"use client"

import { GetLocationById } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Details(){
    const params = useParams()
    const id = params.id as string

    const [Station,setStation] = useState<RawStation | null>(null)
    const [LoadingStation,setLoadingStation] = useState(true)
    useEffect(()=>{
        const FetchLocation = async ()=>{
            const data:RawStation = await GetLocationById(id)
            setStation(data)
            setLoadingStation(false)
        }
        FetchLocation()
    },[])

    return(
        <div>{Station?.address}</div>
    )
}