'use client';

import { useState } from 'react';

export default function FindMyPath() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departureParams = {
      id: `stop_area:${departure}`,
      name: departure,
      type: "STOP_AREA"
    };

    const arrivalParams = {
      id: `stop_area:${arrival}`,
      name: arrival,
      type: "STOP_AREA"
    };

    const now = new Date();
    const dateStr = now.toISOString();

    const baseUrl = 'https://webviews.infotbm.com/fr/itineraires/resultats';
    const params = new URLSearchParams({
      departure: JSON.stringify(departureParams),
      arrival: JSON.stringify(arrivalParams),
      date: dateStr,
      isDepartureDate: 'true',
      preferences: '0',
      transportModes: 'bss',
      option: 'earliestArrival',
      withAccessibility: '0'
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="Lieu de départ" required/>
        </div>

        <div>
          <input type="text" value={arrival} onChange={(e) => setArrival(e.target.value)} placeholder="Lieu d'arrivée" required/>
        </div>

        <button type="submit">C'est parti !</button>
      </form>
    </div>
  );
}
