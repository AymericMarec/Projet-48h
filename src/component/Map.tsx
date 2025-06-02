


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { Location } from '@/type/map'
import { useEffect, useState } from 'react'
import { GetLocations } from '@/lib/api/map'
import { RawStation } from '@/type/map'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})


export default function Map(){
    const [mapData,SetMapData] =  useState<RawStation[] | null>(null)
    const [Loading,SetLoading] = useState(true)
    useEffect(()=>{
        const FetchLocation = async ()=>{
            const data = await GetLocations()
            SetMapData(data)
            SetLoading(false)
        }
        FetchLocation()
    },[])
    
    if (Loading || !mapData) return <p>Chargement de la carte...</p>

    const center: LatLngExpression = [44.8378, -0.5792] 

    if (mapData.length === 0) return <p>Aucune station trouvée.</p>
    return(
        <MapContainer center={center} zoom={6} scrollWheelZoom style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />
            
            {mapData.map((loc) => (
                <Marker key={loc._id} position={loc.coordinates.coordinates}>
                <Popup>{loc.name[0].text}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}