"use client"

import { GetLocationById } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import Map from "@/component/mapPage/Map"
import dynamic from 'next/dynamic'
import Header from "@/component/Header"

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
        <div style={{ minHeight: '100vh', overflowY: 'auto', background: '#F6FAFB' }}>
            <Header/>

            {/* Barre séparatrice */}
            <div style={{ width: '100%', height: 1, background: '#E5E5E5', margin: 0, marginBottom: 18 }} />

            {/* Fil d'Ariane */}
            <div style={{ fontSize: 13, color: '#888', marginLeft: 48, marginBottom: 18, fontFamily: 'Inter, Arial, sans-serif' }}>
                Accueil &gt; {Station?.name?.[0]?.text || ''}
            </div>

            {/* Bloc d'information principal */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '0 auto 32px auto',
                padding: '32px 48px',
                maxWidth: 1200,
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                fontFamily: 'Inter, Arial, sans-serif',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {/* Icône vélo */}
                    <svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <circle cx="18" cy="18" r="18" fill="#4EC9B4" fillOpacity="0.1"/>
                            <path d="M10 26C12.2091 26 14 24.2091 14 22C14 19.7909 12.2091 18 10 18C7.79086 18 6 19.7909 6 22C6 24.2091 7.79086 26 10 26Z" stroke="#4EC9B4" strokeWidth="2"/>
                            <path d="M26 26C28.2091 26 30 24.2091 30 22C30 19.7909 28.2091 18 26 18C23.7909 18 22 19.7909 22 22C22 24.2091 23.7909 26 26 26Z" stroke="#4EC9B4" strokeWidth="2"/>
                            <path d="M10 22H18L22 14" stroke="#4EC9B4" strokeWidth="2"/>
                            <path d="M18 22L14 14H18" stroke="#4EC9B4" strokeWidth="2"/>
                        </g>
                    </svg>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 28, color: '#2EAD95', letterSpacing: '-0.5px' }}>{Station?.name?.[0]?.text || ''}</div>
                        <div style={{ fontSize: 15, color: '#222', marginTop: 6, fontWeight: 400 }}>{Station?.address || ''}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <button
                        onClick={toggleFav}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            border: '1.5px solid #C4C4C4',
                            background: '#fff',
                            borderRadius: 24,
                            padding: '10px 28px',
                            fontSize: 15,
                            color: '#222',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontFamily: 'Inter, Arial, sans-serif',
                            boxShadow: isFav ? '0 0 0 2px #2EAD9522' : 'none',
                            transition: 'box-shadow 0.2s',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.3333L6.66667 12.1333C3.33333 9.13333 1.33333 7.4 1.33333 5.33333C1.33333 3.73333 2.73333 2.33333 4.33333 2.33333C5.2 2.33333 6.03333 2.73333 6.6 3.4C7.16667 2.73333 8 2.33333 8.86667 2.33333C10.4667 2.33333 11.8667 3.73333 11.8667 5.33333C11.8667 7.4 9.86667 9.13333 6.53333 12.1333L8 13.3333Z" stroke={isFav ? '#2EAD95' : '#C4C4C4'} strokeWidth="1.5" fill={isFav ? '#2EAD95' : 'none'} />
                        </svg>
                        {isFav ? 'Retirer le favori' : 'Ajouter à mes favoris'}
                    </button>
                    <button
                        style={{
                            background: '#FF5A7D',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 24,
                            padding: '12px 28px',
                            fontSize: 16,
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontFamily: 'Inter, Arial, sans-serif',
                            boxShadow: '0 2px 8px #FF5A7D22',
                        }}
                    >
                        Signaler un problème
                    </button>
                </div>
            </div>

            {/* Colonne principale : Disponibilités à gauche, carte à droite */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 48,
                background: '#F6FAFB',
                minHeight: 600,
                padding: '32px 0',
            }}>
                {/* Colonne gauche : Disponibilités */}
                <div style={{ flex: 1, maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Inter, Arial, sans-serif' }}>
                    <div style={{ width: '100%', fontWeight: 700, fontSize: 24, marginBottom: 24, color: '#111' }}>Disponibilités</div>
                    <div style={{
                        width: '100%',
                        background: '#fff',
                        borderRadius: 24,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                        padding: '28px 32px',
                        marginBottom: 32,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                        fontFamily: 'Inter, Arial, sans-serif',
                    }}>
                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 18 }}>En ce moment</div>
                        <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'flex-start' }}>
                            {/* Vélo classique */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                                <img src="/images/autres/velo.png" alt="vélo" style={{ width: 48, height: 48, marginBottom: 2 }} />
                                <div style={{ fontWeight: 700, fontSize: 28, color: '#2EAD95' }}>{Station?.vehicle_types_available?.find(v => v.vehicle_type_id === 'classic')?.count ?? '-'}</div>
                                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>vélos</div>
                            </div>
                            {/* Vélo électrique */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                                <img src="/images/autres/velo_elec.png" alt="vélo électrique" style={{ width: 48, height: 48, marginBottom: 2 }} />
                                <div style={{ fontWeight: 700, fontSize: 28, color: '#2EAD95' }}>{Station?.vehicle_types_available?.find(v => v.vehicle_type_id === 'electric')?.count ?? '-'}</div>
                                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>vélos électrique</div>
                            </div>
                            {/* Places restantes */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                                <img src="/images/autres/places.png" alt="places restantes" style={{ width: 48, height: 48, marginBottom: 2 }} />
                                <div style={{ fontWeight: 700, fontSize: 28, color: '#2EAD95' }}>{Station?.num_docks_available ?? '-'}</div>
                                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>places restantes</div>
                            </div>
                            {/* Capacité */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                                <img src="/images/autres/capacite.png" alt="capacité" style={{ width: 48, height: 48, marginBottom: 2 }} />
                                <div style={{ fontWeight: 700, fontSize: 28, color: '#2EAD95' }}>{Station?.capacity ?? '-'}</div>
                                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>capacité</div>
                            </div>
                        </div>
                    </div>
                    <button style={{
                        background: '#4EC9B4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 24,
                        padding: '14px 48px',
                        fontSize: 18,
                        fontWeight: 600,
                        fontFamily: 'Inter, Arial, sans-serif',
                        cursor: 'pointer',
                        marginTop: 8,
                        boxShadow: '0 2px 8px #4EC9B422',
                    }}>
                        Réserver mon vélo
                    </button>
                </div>
                {/* Colonne droite : Map */}
                <div style={{ flex: 1, minWidth: 350, maxWidth: 700, borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fff', height: 420 }}>
                    <Map id={id} zoom={13} width="100%" height="420px" />
                </div>
            </div>
        </div>
    )
}