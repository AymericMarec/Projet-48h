'use client'

import Map from "@/component/mapPage/Map"
import SearchStationDisplay from "@/component/searchStationDisplay"
import dynamic from 'next/dynamic'
import { useState, useMemo } from "react"
import Header from "@/component/Header"
import { useRouter } from "next/navigation"

export default function MapPage(){
    const Map = dynamic(() => import('@/component/mapPage/Map'), {
        ssr: false,
    })
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setSearchTerm(e.target.value)
    }
    //permet que la map se recharge pas quand on tape dans la barre de recherche
    const MemoizedMap = useMemo(() => <Map search={searchTerm} zoom={12} height="100%" width="100vw" />, [searchTerm])
    
    return(
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ position: 'relative', flex: 1, width: '100vw', height: '100%', minHeight: 0 }}>
                <Map search={searchTerm} zoom={12} height="100%" width="100vw" />
                {/* Overlay recherche */}
                <div style={{
                    position: 'absolute',
                    top: 32,
                    left: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        marginTop: 0,
                        background: '#F6FAFB',
                        borderRadius: 18,
                        boxShadow: '0 2px 12px #0001',
                        padding: '24px 24px 18px 24px',
                        width: 400,
                        maxWidth: '90vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        pointerEvents: 'auto',
                    }}>
                        {/* Ligne retour + titre */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, padding: 0 }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#7CB8F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <span style={{ fontWeight: 600, fontSize: 18, color: '#3A4A5A', fontFamily: 'Inter, Arial, sans-serif' }}>Stations LE VÉLO</span>
                        </div>
                        {/* Input recherche */}
                        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher une station LE VÉLO" style={{ width: '100%', border: 'none', outline: 'none', background: '#fff', fontSize: 16, fontFamily: 'Inter, Arial, sans-serif', borderRadius: 10, padding: '12px 0 12px 14px', marginBottom: 18, boxShadow: '0 1px 4px #0001', boxSizing: 'border-box' }} />
                        {/* Liste suggestions */}
                        <div style={{ maxHeight: 340, overflowY: 'auto', background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px #0001', padding: '10px 0', fontFamily: 'Inter, Arial, sans-serif' }}>
                            <SearchStationDisplay search={searchTerm} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}