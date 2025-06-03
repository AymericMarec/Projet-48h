'use client'

import { RawStation } from "@/type/map"

export function FilterStations(query: string, stations: RawStation[]): RawStation[] {
  const lowerQuery = query.toLowerCase().trim()
  console.log(stations)
  console.log(query)
  if(!stations){
      return stations
  }

  return stations.filter(station =>
    station.name.length > 0 &&
    station.name[0].text.toLowerCase().includes(lowerQuery)
  )
}