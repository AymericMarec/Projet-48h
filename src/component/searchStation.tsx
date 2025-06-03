'use client'

import { useEffect, useState } from 'react'
import { GetLocations } from '@/lib/api/map'
import { RawStation } from '@/type/map'
import SearchStationDisplay from './searchStationDisplay'

export default function SearchStation() {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setSearchTerm(e.target.value)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Recherchez par arrêt" style={{ width: '70%', margin: '0 auto' }} />
            <SearchStationDisplay search={searchTerm}/>
        </div>
    )
}
