'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { Location,MapProps } from '@/type/map'
import { useEffect, useState } from 'react'
import { GetLocations,GetLocationById } from '@/lib/api/map'
import { RawStation } from '@/type/map'
import { FilterStations } from "@/lib/api/filter"


delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})


export default function Map(props:MapProps){
    const [mapData,SetMapData] =  useState<RawStation[] | null>(null)
    const [filteredData,SetfilteredData] =  useState<RawStation[] | null>(null)
    const [Loading,SetLoading] = useState(true)
    useEffect(()=>{
        const FetchLocation = async ()=>{
            const data = await GetLocations()
            SetMapData(data)
            SetfilteredData(data)
            SetLoading(false)
        }
        const FetchLocationById = async ()=>{
            const data = await GetLocationById(props.id as string)
            SetMapData([data])
            SetfilteredData([data])
            SetLoading(false)
        }
        if(!props.id){
            FetchLocation()
        }else{
            FetchLocationById()
        }
        
    },[])

    useEffect(()=>{
        if (!mapData) return;
        if (!props.search) {
            SetfilteredData(mapData);
        } else {
            SetfilteredData(FilterStations(props.search, mapData));
        }
    },[props.search,mapData])
    
    if (Loading || !filteredData) return <p>Chargement de la carte...</p>

    const center: LatLngExpression = [44.8378, -0.5792] 

    if (filteredData.length === 0) return <p>Aucune station trouvée.</p>
    return(
        <MapContainer center={center} zoom={props.zoom} scrollWheelZoom style={{ height: props.height, width: props.width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />
            
            {filteredData.map((loc) => (
                <Marker key={loc._id} position={loc.coordinates.coordinates}>
                <Popup>{loc.name[0].text}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
    
}
