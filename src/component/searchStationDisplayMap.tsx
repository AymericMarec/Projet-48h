'use client'

import { GetLocations } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface SearchStationDisplayProps{
    search:string
}

export default function SearchStationDisplay(props:SearchStationDisplayProps){
    const [searchTerm, setSearchTerm] = useState('')
    const [stations, setStations] = useState<RawStation[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const router = useRouter();
    
    useEffect(() => {
        const fetchStations = async () => {
            const data = await GetLocations()
            if (!data || data.length === 0) {
                setError('Aucune station trouvée')
            } else {             
                setStations(data)        
            }
        }
        fetchStations()
    }, [])

    useEffect(()=>{
        setSearchTerm(props.search)
        setIsDropdownOpen(true)
    },[props.search])

    const filteredStations = stations.filter(station => 
        station.name[0].text.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5)


    const handleStationSelect = (stationName: string) => {
        setSearchTerm(stationName)
        setIsDropdownOpen(false)
    }

    return(
    <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: '18px 18px 12px 18px', margin: '0 auto', marginTop: 18, fontFamily: 'Inter, Arial, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 12h8m-4-4v8" stroke="#7CB8F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#7CB8F7" strokeWidth="2"/></svg>
            </span>
            <span style={{ fontWeight: 600, fontSize: 17, color: '#3A4A5A' }}>Stations LE VÉLO</span>
        </div>
        {/* Suggestions */}
        {(isDropdownOpen && searchTerm) ? (
            <>
                <ul className="suggestions-list" style={{ width: '100%', background: '#F6FAFB', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 0, margin: 0, listStyle: 'none', maxHeight: 220, overflowY: 'auto' }}>
                    {filteredStations.length > 0 ? (
                        filteredStations.map((station) => (
                            <li
                                key={station._id}
                                onClick={() => router.push(`/details/${station._id}`)}
                                className="suggestion-item"
                                style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 15, color: '#222', borderBottom: '1px solid #F0F0F0' }}
                            >
                                {station.name[0].text}
                            </li>
                        ))
                    ) : (
                        <li className="suggestion-item empty" style={{ padding: '10px 16px', color: '#888', fontSize: 15 }}>Aucune station trouvée</li>
                    )}
                </ul>
                <div onClick={() => setIsDropdownOpen(false)} />
            </>
        ) : null}
    </div>
    )
}