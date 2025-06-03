'use client'

import { GetLocations } from "@/lib/api/map"
import { RawStation } from "@/type/map"
import { useEffect, useState } from "react"

interface SearchStationDisplayProps{
    search:string
}

export default function SearchStationDisplay(props:SearchStationDisplayProps){
    const [searchTerm, setSearchTerm] = useState('')
    const [stations, setStations] = useState<RawStation[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    
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
    <div>
        {isDropdownOpen && searchTerm && (
            <ul>
                {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                        <li
                            key={station._id}
                            onClick={() => handleStationSelect(station.name[0].text)}

                        >
                            {station.name[0].text}
                        </li>
                    ))
                ) : (
                    <li>Aucune station trouvée</li>
                )}
            </ul>
        )}

        {isDropdownOpen && (
            <div onClick={() => setIsDropdownOpen(false)} />
        )}
    </div>
    )
}