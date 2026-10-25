import React from 'react';
import '../styles/NearbyDoctorsScreen.css';

function NearbyDoctorsScreen({ specialty, onBack }) {

    // Datos temporales.
    // Más adelante estos datos vendrán del backend + Google Places.
    const doctors = [
        {
            id: 1,
            name: 'Dra. Laura Hernández',
            initials: 'LH',
            specialty: specialty || 'Medicina Interna',
            rating: '4.8',
            distance: '1.2 km',
            nextAvailable: '10:30 AM',
            address: 'Av. Revolución 123, Pachuca, Hidalgo',
            phone: null,
            available: true
        },
        {
            id: 2,
            name: 'Dr. Carlos Martínez',
            initials: 'CM',
            specialty: specialty || 'Medicina Interna',
            rating: '4.7',
            distance: '1.8 km',
            nextAvailable: '11:15 AM',
            address: 'Blvd. Luis Donaldo Colosio 456, Pachuca, Hidalgo',
            phone: null,
            available: true
        },
        {
            id: 3,
            name: 'Dra. Mariana Torres',
            initials: 'MT',
            specialty: specialty || 'Medicina Interna',
            rating: '4.9',
            distance: '2.4 km',
            nextAvailable: '12:00 PM',
            address: 'Calle Hidalgo 78, Centro, Pachuca, Hidalgo',
            phone: null,
            available: true
        },
        {
            id: 4,
            name: 'Dr. Jorge Ramírez',
            initials: 'JR',
            specialty: specialty || 'Medicina Interna',
            rating: '4.6',
            distance: '3.1 km',
            nextAvailable: '1:30 PM',
            address: 'Av. Madero 210, Pachuca, Hidalgo',
            phone: null,
            available: false
        }
    ];

    const handleMap = (doctor) => {
        const query = encodeURIComponent(doctor.address);

        // Abre Google Maps buscando la dirección
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${query}`,
            '_blank'
        );
    };

    const handleCall = (doctor) => {
        if (!doctor.phone) {
            return;
        }

        window.location.href = `tel:${doctor.phone}`;
    };

    return (
        <div className="nearby-doctors-page">

            {/* HEADER */}
            <header className="nearby-doctors-header">

                <button
                    className="nearby-back-button"
                    onClick={onBack}
                >
                    ←
                </button>

                <div className="nearby-header-title">
                    <h1>Médicos cercanos</h1>
                    <p>Encuentra atención cerca de ti</p>
                </div>

            </header>

            {/* CONTENIDO */}
            <main className="nearby-doctors-content">

                {/* ESPECIALIDAD SUGERIDA */}
                <section className="specialty-banner">

                    <div className="specialty-icon">
                        +
                    </div>

                    <div>
                        <span>Especialidad sugerida</span>

                        <strong>
                            {specialty || 'Medicina Interna'}
                        </strong>
                    </div>

                </section>

                {/* TÍTULO Y CONTADOR */}
                <div className="nearby-doctors-title-row">

                    <div>
                        <h2>Médicos cercanos</h2>
                        <p>
                            Resultados para orientarte en tu búsqueda
                        </p>
                    </div>

                    <span className="doctor-count">
                        {doctors.length}
                    </span>

                </div>

                {/* LISTA DE MÉDICOS */}
                <section className="doctors-list">

                    {doctors.map((doctor) => (

                        <article
                            className="doctor-card"
                            key={doctor.id}
                        >

                            {/* INFORMACIÓN PRINCIPAL */}
                            <div className="doctor-main">

                                <div className="doctor-avatar">
                                    {doctor.initials}
                                </div>

                                <div className="doctor-info">

                                    <div className="doctor-name-row">

                                        <h3>
                                            {doctor.name}
                                        </h3>

                                        {doctor.available && (
                                            <span className="availability">
                                                <span className="availability-dot"></span>
                                                Disponible
                                            </span>
                                        )}

                                    </div>

                                    <p className="doctor-specialty">
                                        {doctor.specialty}
                                    </p>

                                    <div className="doctor-rating">
                                        <span className="star">
                                            ★
                                        </span>

                                        <strong>
                                            {doctor.rating}
                                        </strong>

                                        <span className="rating-text">
                                            Valoración
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* DATOS DEL MÉDICO */}
                            <div className="doctor-details">

                                <div className="detail-item">
                                    <span className="detail-icon">
                                        📍
                                    </span>

                                    <div>
                                        <small>
                                            Distancia
                                        </small>

                                        <strong>
                                            {doctor.distance}
                                        </strong>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-icon">
                                        ⏰
                                    </span>

                                    <div>
                                        <small>
                                            Próxima disponibilidad
                                        </small>

                                        <strong>
                                            {doctor.nextAvailable}
                                        </strong>
                                    </div>
                                </div>

                            </div>

                            {/* DIRECCIÓN */}
                            <div className="doctor-address">

                                <span className="address-icon">
                                    📍
                                </span>

                                <span>
                                    {doctor.address}
                                </span>

                            </div>

                            {/* BOTONES */}
                            <div className="doctor-actions">

                                <button
                                    className="map-button"
                                    onClick={() => handleMap(doctor)}
                                >
                                    <span>📍</span>
                                    Ver en mapa
                                </button>

                                <button
                                    className={`call-button ${
                                        !doctor.phone
                                            ? 'disabled'
                                            : ''
                                    }`}
                                    onClick={() => handleCall(doctor)}
                                    disabled={!doctor.phone}
                                >
                                    <span>📞</span>

                                    {doctor.phone
                                        ? 'Llamar'
                                        : 'Teléfono no disponible'
                                    }
                                </button>

                            </div>

                        </article>

                    ))}

                </section>

                {/* AVISO */}
                <div className="nearby-disclaimer">

                    <strong>
                        Información orientativa
                    </strong>

                    <p>
                        Los médicos mostrados son resultados de ejemplo.
                        La disponibilidad, distancia, teléfono y datos
                        del establecimiento deberán confirmarse mediante
                        el servicio de búsqueda conectado.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default NearbyDoctorsScreen;