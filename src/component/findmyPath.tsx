'use client';

import { useState } from 'react';

export default function FindMyPath() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `https://webviews.infotbm.com/fr/itineraires?departure=${departure}&arrival=${arrival}`;
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
        <button type="submit"> C'est parti !</button>
      </form>
    </div>
  );
}
