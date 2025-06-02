'use server'

import { RawStation } from "@/type/map";
import { on } from "events";
import { LatLngExpression } from "leaflet";

export async function GetLocations() {
    const API_URL = process.env.API_URL
    const response = await fetch(`${API_URL}/stations`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data:RawStation[] = await response.json()

    //on inverse la longitude et latitude , par ce que les donnnées recu sont puantes
    for(const station in data ){
        const original = data[station].coordinates.coordinates;

        if (Array.isArray(original) && original.length === 2) {
        const correctedCoordinates: LatLngExpression = [original[1], original[0]];
        data[station].coordinates.coordinates = correctedCoordinates;
        }
    }
    return data
}