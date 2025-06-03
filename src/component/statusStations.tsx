import React, { useEffect, useState } from 'react';
import '../css/status.css';
import { GetLocations } from '@/lib/api/map';
import { RawStation } from '@/type/map';

export default function StatusStations() {
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
    (station) => !station.is_installed || (!station.is_renting && !station.is_returning)
  );

  if (error) {
    return <div className="statusError">{error}</div>;
  }


  if (stationsHs.length === 0) {
    return (
      <div className="statusCard">
        <div className="upPart">
        <img src="/img/stationsOKlogo.png" alt="Stations HS Logo" className="stationsOKLogo"/>
        </div>
        <div className="downPart">
          <p className="noPerturbationsText">
            Aucune perturbation en cours<br />
            sur les stations Le Vélo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="statusCard">
      <div className="statusCardLeft">
      <img src="/img/stationsHSlogo.png" alt="Stations HS Logo" className="stationsHSLogo"/>
      </div>
      <div className="statusCardCenter">
        <span className="nbStationsHS">{stationsHs.length}</span>
        <span className="stationsImpactees">stations impactées</span>
      </div>
      <div className="statusCardRight">
        <span className="arrowRight">→</span>
      </div>
      <div className="statusCardBottom">
        <button className="voirDetailBtn"  style={{ color: '#58B998' }}>Voir le détail</button>
      </div>
    </div>
  );
}
