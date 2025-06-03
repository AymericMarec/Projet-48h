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

/** Définition des icônes personnalisées pour les marqueurs **/
const markerIcon = (color: string) => L.divIcon({
    className: '',
    html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 2px 8px #0002;border:2.5px solid #fff;"></div>`
});

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
            
            {filteredData.map((loc) => {
                // Détermination de la couleur du marqueur
                let color = '#4EC9B4'; // vert par défaut
                const classicCount = loc.vehicle_types_available?.find(v => v.vehicle_type_id === 'classic')?.count ?? 0;
                if (loc.is_installed === false || (loc.is_renting === false && loc.is_returning === false)) {
                    color = '#BDBDBD'; // gris indisponible
                } else if (classicCount >= 6) {
                    color = '#4EC9B4'; // vert beaucoup
                } else if (classicCount >= 3) {
                    color = '#FFA726'; // orange moyen
                } else if (classicCount >= 1) {
                    color = '#FF5A7D'; // rouge peu
                } else {
                    color = '#FF5A7D'; // rouge aucun
                }
                return (
                    <Marker key={loc._id} position={loc.coordinates.coordinates} icon={markerIcon(color)}>
                        <Popup>
                            <div style={{
                                minWidth: 210,
                                maxWidth: 240,
                                background: '#F3F8FA',
                                borderRadius: 16,
                                boxShadow: '0 2px 8px #0001',
                                padding: '12px 12px 18px 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                fontFamily: 'Inter, Arial, sans-serif',
                            }}>
                                <div style={{
                                    width: '100%',
                                    background: '#fff',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textAlign: 'center',
                                    marginBottom: 10,
                                    padding: '4px 0',
                                    color: '#222',
                                }}>{loc.name[0].text}</div>
                                {/* Badge état + contenu selon service */}
                                {(loc.is_installed === false || (loc.is_renting === false && loc.is_returning === false)) ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', borderRadius: 12, padding: '4px 12px', color: '#FF5A7D', fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
                                            <span style={{ fontSize: 18 }}>❌</span> Hors service
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            background: '#fff',
                                            borderRadius: 16,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            padding: '14px 12px',
                                            marginBottom: 16,
                                            marginTop: 2,
                                        }}>
                                            <img src="/images/autres/station_indispo.png" alt="Station indisponible" style={{ width: 40, height: 40 }} />
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: 18, color: '#222' }}>Station indisponible</div>
                                                <div style={{ fontSize: 12, color: '#888', marginTop: 2, fontWeight: 400 }}>
                                                    Il n'est pas possible d'utiliser cette station pour l'instant.
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', borderRadius: 12, padding: '4px 12px', color: '#2EAD95', fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
                                            <span style={{ fontSize: 18 }}>✔️</span> En service
                                        </div>
                                        {/* Infos */}
                                        <div style={{
                                            width: '100%',
                                            background: '#fff',
                                            borderRadius: 16,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '12px 10px',
                                            marginBottom: 16,
                                            marginTop: 2,
                                        }}>
                                            {/* Vélos */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48 }}>
                                                <img src="/images/autres/velo.png" alt="vélo" style={{ width: 32, height: 32, marginBottom: 2 }} />
                                                <div style={{ fontWeight: 700, fontSize: 20, color: '#2EAD95' }}>{loc.vehicle_types_available?.find(v => v.vehicle_type_id === 'classic')?.count ?? '-'}</div>
                                                <div style={{ fontSize: 11, color: '#888', marginTop: 0 }}>vélos</div>
                                            </div>
                                            {/* Places */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48 }}>
                                                <img src="/images/autres/places.png" alt="places restantes" style={{ width: 32, height: 32, marginBottom: 2 }} />
                                                <div style={{ fontWeight: 700, fontSize: 20, color: '#2EAD95' }}>{loc.num_docks_available ?? '-'}</div>
                                                <div style={{ fontSize: 11, color: '#888', marginTop: 0 }}>places restantes</div>
                                            </div>
                                            {/* Capacité */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48 }}>
                                                <img src="/images/autres/capacite.png" alt="capacité" style={{ width: 32, height: 32, marginBottom: 2 }} />
                                                <div style={{ fontWeight: 700, fontSize: 20, color: '#111' }}>{loc.capacity ?? '-'}</div>
                                                <div style={{ fontSize: 11, color: '#888', marginTop: 0 }}>capacité</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <button
                                    style={{
                                        background: '#4EC9B4',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 18,
                                        padding: '10px 0',
                                        fontSize: 15,
                                        fontWeight: 600,
                                        fontFamily: 'Inter, Arial, sans-serif',
                                        cursor: 'pointer',
                                        width: '100%',
                                        marginTop: 2,
                                    }}
                                    onClick={() => window.location.href = `/details/${loc._id}`}
                                >
                                    Voir les détails
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
    
}
