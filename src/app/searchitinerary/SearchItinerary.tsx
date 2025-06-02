import React from 'react';
import '../css/searchitinerary.css';

export default function SearchItinerary() {
  return (
    <div className="si-container-tw">
      {/* Header noir arrondi */}
      <div className="si-header-tw">
        <h2 className="si-title-tw">RECHERCHER MON ITINÉRAIRE</h2>
      </div>
      {/* Formulaire */}
      <div className="si-form-wrapper-tw">
        <div className="si-inputs-tw">
          {/* Champ départ */}
          <input
            type="text"
            placeholder="(Adresse, arrêt, commune...)"
            className="si-input-tw"
            disabled
          />
          {/* Champ arrivée */}
          <div className="si-input-arrivee-wrapper-tw">
            <input
              type="text"
              placeholder="(Adresse, arrêt, commune...)"
              className="si-input-tw"
              disabled
            />
            {/* Rond noir */}
            <div className="si-switch-circle-tw"></div>
          </div>
        </div>
        {/* Bouton */}
        <button className="si-btn-tw" disabled>
          C'est parti !
        </button>
      </div>
    </div>
  );
} 