'use client'

import Header from '@/component/Header'
import '@/css/path.css' // Assure-toi que ce fichier existe et est bien importé

export default function PathFinding() {
    return (
        <>
            <Header />
            <div className="iframe-container">
                <iframe
                    src="https://webviews.infotbm.com/fr/itineraires"
                    className="custom-iframe"
                />
            </div>
        </>
    )
}
