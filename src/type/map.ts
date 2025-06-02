import { LatLngExpression } from 'leaflet'

export interface StationName {
  text: string
  language: string
}

export interface VehicleTypeAvailable {
  vehicle_type_id: string
  count: number
}

export interface RawStation {
  _id: string
  station_id: string
  coordinates: {
    type: string
    coordinates: LatLngExpression
  }
  address: string
  capacity: number
  createdAt: string
  updatedAt: string
  is_charging_station: boolean
  is_installed: boolean
  is_renting: boolean
  is_returning: boolean
  is_virtual_station: boolean
  last_reported: string
  name: StationName[]
  num_docks_available: number
  num_vehicles_available: number
  post_code: string
  rental_methods: string[]
  vehicle_types_available: VehicleTypeAvailable[]
}

export interface Location {
  id: string
  name: string
  position: LatLngExpression
}

export interface MapProps{
  id?:string
}
