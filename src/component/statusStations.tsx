import React from 'react';
import '../css/status.css';

export default function StatusStations() {
  return (
    <div className="statusContainer">
      <div className="upPart">
        <div className="circleCheck">
          <svg className="checkIcon" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="none" fill="currentColor" opacity="0.2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
          </svg>
        </div>
      </div>
      <div className="downPart">
        <p className="noPerturbationsText">
          Aucune perturbation en cours<br />
          sur les stations Le Vélo
        </p>
      </div>
    </div>
  );
};

