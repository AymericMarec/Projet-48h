import React from 'react';
import '../../app/css/sipopup.css';

export default function SearchItinerary() {
  return (
    <div className="si-container">
      <div className="si-header">
        <h2 className="si-title">RECHERCHER MON ITINÉRAIRE</h2>
      </div>
      <div className="si-form-wrapper">
        <div className="si-inputs">
          <input
            type="text"
            placeholder="(Adresse, arrêt, commune...)"
            className="si-input"
            disabled
          />
          <div className="si-input-arrivee-wrapper">
            <input
              type="text"
              placeholder="(Adresse, arrêt, commune...)"
              className="si-input"
              disabled
            />
            <div className="si-switch-circle"></div>
          </div>
        </div>
        <button className="si-btn" disabled>
          C’est parti !
        </button>
      </div>
    </div>
  );
}
