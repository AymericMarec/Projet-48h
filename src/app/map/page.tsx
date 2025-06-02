'use client'

import Map from "@/component/mapPage/Map"
import dynamic from 'next/dynamic'

export default function MapPage(){
    const Map = dynamic(() => import('@/component/mapPage/Map'), {
        ssr: false,
    })

    return(
        <div>
            <Map></Map>
        </div>
    )
}