import React from 'react';
import '../css/status.css'; // Assurez-vous que ce chemin est correct
import { RawStation } from '@/type/map';
import router, { useRouter } from 'next/router';

export default function StationHS ({ station }: { station: RawStation }) {

  const handleClick = () => {
    window.location.href = `/details/${station._id}`
  };
  return (
    <div className="stationHSCard"  onClick={handleClick}>
      <img src="/img/stationHSlogo.png" alt="Station HS Logo" className='stationHSImage'/>
      <div className="stationHSTextContent">
        <h2 className="stationHSTitle">Station {station.name[0].text} indisponible</h2>
        <p className="stationHSDescription">Il n’est pas possible d’utiliser cette station pour l’instant.</p>
      </div>
          {station.is_installed ? (
        <h2 className="stationHSDuration">
          Durée : en attente d'infos
        </h2>
      ) : (
        <h2 className="stationHSDuration">
          Mise en service dans : en attente d'infos
        </h2>
      )}
    </div>

  );
};


