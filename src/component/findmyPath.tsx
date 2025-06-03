'use client';

import { useState } from 'react';

export default function FindMyPath() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/pathfinding`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <button type="submit"> C'est parti !</button>
      </form>
    </div>
  );
}
