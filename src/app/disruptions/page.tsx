'use client'

import Header from '@/component/Header'
import StationHS from '@/component/stationHS'
import '@/css/status.css' 
import { GetLocations } from '@/lib/api/map';
import { RawStation } from '@/type/map';
import { useEffect, useState } from 'react';

export default function Disruptions() {
    const [stations, setStations] = useState<RawStation[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchStations = async () => {
        try {
          const data = await GetLocations();
          if (!data || data.length === 0) {
            setError('Aucune station trouvée');
          } else {
            setStations(data);
          }
        } catch (e) {
          setError('Erreur lors du chargement des stations');
        }
      };
      fetchStations();
    }, []);
  
    const stationsHs: RawStation[] = stations.filter(
      (station) => station.is_installed && (!station.is_renting && !station.is_returning)
    );

    const stationsNotInstalled : RawStation[] = stations.filter(
        (station) => !station.is_installed
      );
  
    if (error) {
      return <div className="statusError">{error}</div>;
    }

    if (stationsHs.length === 0) {
        return <div>prout</div>
    }

    return (
        <>
            <Header/>
            <h2 className="stationsHSText">
                Stations Hors-Service
            </h2>
            <div className="stationsHSList">
                {stationsHs.map((stationd) => (
                    <StationHS  key={stationd.station_id} station={stationd} />
                ))}
            </div>
            <h2 className="stationsNotInstalledText">
                Stations en cours d'installation
            </h2>
            <div className="stationsHSList">
                {stationsNotInstalled.map((stationd) => (
                    <StationHS  key={stationd.station_id} station={stationd} />
                ))}
            </div>
        </>
    )
}
