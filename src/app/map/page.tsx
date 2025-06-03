'use client'

import Map from "@/component/mapPage/Map"
import SearchStationDisplay from "@/component/searchStationDisplay"
import dynamic from 'next/dynamic'
import { useState, useMemo } from "react"

export default function MapPage(){
    const Map = dynamic(() => import('@/component/mapPage/Map'), {
        ssr: false,
    })
    
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setSearchTerm(e.target.value)
    }
    //permet que la map se recharge pas quand on tape dans la barre de recherche
    const MemoizedMap = useMemo(() => <Map search={searchTerm} zoom={12} />, [searchTerm])
    
    return(
        <div>
            <div>
                <input type="text" value={searchTerm} onChange={handleInputChange} />
                <SearchStationDisplay search={searchTerm}/>
            </div>
            <div>
                {MemoizedMap}
            </div>
            
        </div>
    )
}