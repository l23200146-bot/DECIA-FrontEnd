
import React, { useState } from 'react';
import '../styles/SelectProfileScreen.css';
import decia from '../assets/DECIA.webp';


const profilesBySymptom = {

    'Dolor de cabeza': [
        {
            id: 'headache-1',
            nombre: 'Carlos García',
            genero: 'Masculino',
            fechaNacimiento: '1990-05-15',
            padecimientosCount: 1,
            photo_url: ''
        },
        {
            id: 'headache-2',
            nombre: 'Mariana Torres',
            genero: 'Femenino',
            fechaNacimiento: '1988-11-02',
            padecimientosCount: 2,
            photo_url: ''
        },
        {
            id: 'headache-3',
            nombre: 'Jorge Ramírez',
            genero: 'Masculino',
            fechaNacimiento: '2001-07-19',
            padecimientosCount: 0,
            photo_url: ''
        }
    ],


    'Dolor abdominal': [
        {
            id: 'abdominal-1',
            nombre: 'Ana López',
            genero: 'Femenino',
            fechaNacimiento: '1995-08-21',
            padecimientosCount: 0,
            photo_url: ''
        },
        {
            id: 'abdominal-2',
            nombre: 'Roberto Sánchez',
            genero: 'Masculino',
            fechaNacimiento: '1982-04-10',
            padecimientosCount: 3,
            photo_url: ''
        },
        {
            id: 'abdominal-3',
            nombre: 'Sofía Martínez',
            genero: 'Femenino',
            fechaNacimiento: '2003-12-05',
            padecimientosCount: 1,
            photo_url: ''
        }
    ],


    'Dolor en el pecho': [
        {
            id: 'chest-1',
            nombre: 'Luis Hernández',
            genero: 'Masculino',
            fechaNacimiento: '1975-03-10',
            padecimientosCount: 2,
            photo_url: ''
        },
        {
            id: 'chest-2',
            nombre: 'Patricia Gómez',
            genero: 'Femenino',
            fechaNacimiento: '1968-09-17',
            padecimientosCount: 4,
            photo_url: ''
        },
        {
            id: 'chest-3',
            nombre: 'Miguel Flores',
            genero: 'Masculino',
            fechaNacimiento: '1993-06-28',
            padecimientosCount: 1,
            photo_url: ''
        }
    ],


    'Fiebre': [
        {
            id: 'fever-1',
            nombre: 'Diego Morales',
            genero: 'Masculino',
            fechaNacimiento: '2000-02-14',
            padecimientosCount: 0,
            photo_url: ''
        },
        {
            id: 'fever-2',
            nombre: 'Laura Castillo',
            genero: 'Femenino',
            fechaNacimiento: '1997-10-23',
            padecimientosCount: 1,
            photo_url: ''
        },
        {
            id: 'fever-3',
            nombre: 'Daniel Vargas',
            genero: 'Masculino',
            fechaNacimiento: '1985-05-30',
            padecimientosCount: 2,
            photo_url: ''
        }
    ]

};


function SelectProfileScreen({
    language,
    theme,
    symptomName,
    onSelectProfile,
    onCreateProfile,
    onBack
}) {

    const profiles = profilesBySymptom[symptomName] || [];

    // Perfil seleccionado visualmente
    const [selectedProfile, setSelectedProfile] = useState(null);


    const handleProfileSelect = (profile) => {

        setSelectedProfile(profile.id);

        onSelectProfile(profile.id);

    };


    return (

        <div className={`select-profile ${theme === 'dark' ? 'dark-mode' : ''}`}>


            {/* HEADER */}

            <header className="select-profile-header">

                <button
                    className="back-button"
                    onClick={onBack}
                    aria-label="Regresar"
                >
                    ‹
                </button>


                <div className="header-title">

                    <h1>
                        Seleccionar perfil
                    </h1>

                    <p>
                        Síntoma: {symptomName}
                    </p>

                </div>


                {/* LOGO DECIA */}

                <img
                    src={decia}
                    alt="DECIA"
                    className="select-profile-logo"
                />

            </header>


            {/* CONTENIDO */}

            <main className="select-profile-content">


                {/* INTRODUCCIÓN */}

                <section className="profile-introduction">

                    <h2>
                        ¿Para quién es la evaluación?
                    </h2>

                    <p>
                        Selecciona el perfil de la persona
                        que presenta este síntoma.
                    </p>

                </section>


                {/* PERFILES */}

                <section className="profiles-list">

                    {profiles.map((profile) => (

                        <button
                            key={profile.id}
                            className={`profile-card ${
                                selectedProfile === profile.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() =>
                                handleProfileSelect(profile)
                            }
                        >


                            {/* AVATAR */}

                            <div className="profile-avatar">

                                {profile.photo_url ? (

                                    <img
                                        src={profile.photo_url}
                                        alt={`Foto de ${profile.nombre}`}
                                    />

                                ) : (

                                    profile.nombre
                                        .charAt(0)
                                        .toUpperCase()

                                )}

                            </div>


                            {/* INFORMACIÓN */}

                            <div className="profile-info">

                                <h3>
                                    {profile.nombre}
                                </h3>

                                <p>
                                    {profile.genero}
                                </p>

                                <p>
                                    Nacimiento: {profile.fechaNacimiento}
                                </p>

                                <p>
                                    {profile.padecimientosCount === 1
                                        ? '1 padecimiento registrado'
                                        : `${profile.padecimientosCount} padecimientos registrados`
                                    }
                                </p>

                            </div>


                            {/* FLECHA */}

                            <span className="profile-arrow">
                                ›
                            </span>


                        </button>

                    ))}

                </section>


                {/* CREAR PERFIL */}

                <button
                    className="create-profile-card"
                    onClick={onCreateProfile}
                >

                    <div className="create-profile-icon">
                        +
                    </div>

                    <div>

                        <h3>
                            Crear nuevo perfil
                        </h3>

                        <p>
                            Agregar otra persona
                        </p>

                    </div>

                </button>


            </main>


            {/* NAVEGACIÓN INFERIOR */}

            <nav className="profile-bottom-nav">

                <button onClick={onBack}>
                    Inicio
                </button>

                <button className="active">
                    Perfiles
                </button>

                <button>
                    Ajustes
                </button>

            </nav>


        </div>
    );
}


export default SelectProfileScreen;












