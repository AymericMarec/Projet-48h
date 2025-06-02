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
        <div>
            <input type="text" value={searchTerm} onChange={handleInputChange} />
            <SearchStationDisplay search={searchTerm}/>
        </div>
    )
}
