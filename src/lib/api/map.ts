'use server'

import { RawStation } from "@/type/map";

export async function GetLocations() {
    const API_URL = process.env.API_URL
        const response = await fetch(`${API_URL}/stations`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data:RawStation[] = await response.json()
    return data
}