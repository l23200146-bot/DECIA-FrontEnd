import React, { useState } from 'react';
import '../styles/ResultScreen.css';

function ResultScreen({
    language,
    theme,
    result,
    onBackHome,
    onFindDoctor
}) {
    const isDark = theme === 'dark';
    const [showCauses, setShowCauses] = useState(true);
    const [showFirstAid, setShowFirstAid] = useState(true);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    /*
     * =====================================================
     * RESULTADO TEMPORAL
     * Posteriormente vendrá del backend.
     * =====================================================
     */

    
    const urgency = (
        result?.urgency || 'AMARILLO'
    ).toUpperCase();


    /*
     * =====================================================
     * DATOS DEL TRIAGE
     * =====================================================
     */

    const urgencyData = {

        ROJO: {
            level: 1,
            label: 'Rojo',
            title: 'Atención inmediata',
            time: 'Requiere atención médica inmediata.',
            description:
                'Se recomienda buscar atención médica de inmediato.',
            className: 'rojo'
        },

        NARANJA: {
            level: 2,
            label: 'Naranja',
            title: 'Emergencia',
            time:
                'Requiere atención médica prioritaria.',
            description:
                'Se recomienda valoración médica lo antes posible.',
            className: 'naranja'
        },

        AMARILLO: {
            level: 3,
            label: 'Amarillo',
            title: 'Urgencia',
            time:
                'Requiere atención médica en las próximas 60 minutos.',
            description:
                'Se recomienda valoración médica en un periodo corto.',
            className: 'amarillo'
        },

        VERDE: {
            level: 4,
            label: 'Verde',
            title: 'Menos urgente',
            time:
                'Puede esperar hasta aproximadamente 120 minutos.',
            description:
                'No se identifican señales de urgencia inmediata.',
            className: 'verde'
        },

        AZUL: {
            level: 5,
            label: 'Azul',
            title: 'No urgente',
            time:
                'Puede ser atendido mediante consulta externa.',
            description:
                'No se identifican señales de urgencia.',
            className: 'azul'
        }

    };


    const currentUrgency =
        urgencyData[urgency] ||
        urgencyData.AMARILLO;


    /*
     * =====================================================
     * DATOS RECIBIDOS
     * =====================================================
     */

    const symptomName =
        result?.symptomName || 'No especificado';

    const answers =
        result?.answers || {};

    const profileId =
        result?.profileId || 'No especificado';

    const doubt =
        result?.doubt;


    /*
     * =====================================================
     * SÍNTOMAS PRESENTADOS
     * =====================================================
     */

    const symptomsPresented =
        Object.values(answers).filter(
            (answer) =>
                answer &&
                answer !== 'Ninguno'
        );


    /*
     * =====================================================
     * POSIBLES CAUSAS
     *
     * Información orientativa.
     * NO representa un diagnóstico.
     * =====================================================
     */

    const possibleCauses = {

        'Dolor de cabeza': [
            'Cefalea tensional',
            'Migraña',
            'Deshidratación',
            'Alteraciones del sueño'
        ],

        'Dolor abdominal': [
            'Indigestión',
            'Gastritis',
            'Alteraciones gastrointestinales',
            'Inflamación abdominal'
        ],

        'Dolor en el pecho': [
            'Dolor muscular',
            'Reflujo gastroesofágico',
            'Ansiedad',
            'Alteraciones cardiovasculares'
        ],

        'Fiebre': [
            'Infección viral',
            'Infección bacteriana',
            'Proceso inflamatorio',
            'Infección respiratoria'
        ]

    };


    /*
     * =====================================================
     * FIEBRE COMO CONTENIDO DE RESPALDO
     * =====================================================
     */

    const causes =
        possibleCauses[symptomName] ||
        possibleCauses['Fiebre'];


    /*
     * =====================================================
     * PRIMEROS AUXILIOS / QUÉ HACER
     * =====================================================
     */

    const firstAid = {

        'Dolor de cabeza': [
            'Descansar en un lugar tranquilo.',
            'Mantener una adecuada hidratación.',
            'Evitar luces o ruidos intensos si aumentan la molestia.'
        ],

        'Dolor abdominal': [
            'Mantener reposo.',
            'Mantener una adecuada hidratación.',
            'Evitar alimentos que puedan aumentar la molestia.'
        ],

        'Dolor en el pecho': [
            'Suspender actividades físicas y mantener reposo.',
            'Evitar realizar esfuerzos.',
            'Si el dolor aumenta o aparece dificultad para respirar, buscar atención inmediata.'
        ],

        'Fiebre': [
            'Mantener reposo.',
            'Mantener una adecuada hidratación.',
            'Mantener un ambiente fresco y cómodo.',
            'Vigilar la aparición de nuevos signos de alarma.'
        ]

    };


    const firstAidData =
        firstAid[symptomName] ||
        firstAid['Fiebre'];


    /*
     * =====================================================
     * ¿EXISTE DUDA ENTRE RESPUESTAS?
     * =====================================================
     */

    const hasDoubt =
        doubt === true ||
        doubt === 'true' ||
        doubt === 'Sí' ||
        doubt === 'Si' ||
        doubt === 'sí' ||
        doubt === 'si';


    /*
     * =====================================================
     * LLAMAR AL 911
     * =====================================================
     */

    const showEmergencyButton =
        urgency === 'ROJO' ||
        urgency === 'NARANJA';


    const handleEmergencyCall = () => {

        window.location.href = 'tel:911';

    };


    /*
     * =====================================================
     * UBICAR MÉDICO
     *
     * Envía el resultado actual a App.js.
     * App.js decidirá la especialidad sugerida
     * y abrirá NearbyDoctorsScreen.
     * =====================================================
     */

    const handleFindDoctor = () => {

        if (onFindDoctor) {
            onFindDoctor(result);
        }

    };


    return (

        <div
            className={`result-screen ${currentUrgency.className} ${
                isDark ? 'dark-mode' : ''
            }`}
        >

            {/* ==========================================
                FONDO DECORATIVO
            ========================================== */}

            <div
                className="medical-pattern"
                aria-hidden="true"
            >

                <span>+</span>
                <span>○</span>
                <span>+</span>
                <span>◇</span>
                <span>+</span>
                <span>○</span>
                <span>◇</span>
                <span>+</span>

            </div>


            {/* ==========================================
                HEADER
            ========================================== */}

            <header className="result-header">

                <button
                    className="result-back"
                    onClick={onBackHome}
                >
                    ‹ Inicio
                </button>

                <h1>
                    Resultado
                </h1>

                <button
                    className="pdf-button"
                    onClick={() =>
                        alert(
                            'La exportación PDF se conectará posteriormente.'
                        )
                    }
                >
                    PDF
                </button>

            </header>


            {/* ==========================================
                CARTA MÉDICA
            ========================================== */}

            <main className="result-content">

                <div className="medical-card">


                    {/* ==================================
                        AVISO MÉDICO
                    ================================== */}

                    <div className="medical-disclaimer">

                        <div>

                            <strong>
                                Aviso importante
                            </strong>

                            <p>
                                DECIA proporciona una orientación
                                inicial y no sustituye el diagnóstico,
                                consejo o tratamiento de un profesional
                                de la salud.
                            </p>

                        </div>

                        <button
                            className="disclaimer-toggle"
                            onClick={() =>
                                setShowDisclaimer(
                                    !showDisclaimer
                                )
                            }
                        >
                            {showDisclaimer
                                ? 'Ocultar'
                                : 'Ver más'}
                        </button>

                    </div>


                    {showDisclaimer && (

                        <div className="disclaimer-extra">

                            Esta valoración se basa en la información
                            proporcionada durante la evaluación.
                            Si los síntomas empeoran, aparecen nuevos
                            signos de alarma o existe preocupación,
                            busca atención médica profesional.

                        </div>

                    )}


                    {/* ==================================
                        RESULTADO DE TRIAGE
                    ================================== */}

                    <section className="urgency-card">

                        <div className="urgency-header">

                            <span className="urgency-circle"></span>

                            <div>

                                <span className="urgency-level">
                                    Nivel {currentUrgency.level}
                                </span>

                                <h2>
                                    {currentUrgency.label}
                                </h2>

                            </div>

                        </div>


                        <h3>
                            {currentUrgency.title}
                        </h3>


                        <p className="urgency-time">
                            {currentUrgency.time}
                        </p>


                        <p className="urgency-description">
                            {currentUrgency.description}
                        </p>


                    </section>


                    {/* ==================================
                        EMERGENCIAS
                    ================================== */}

                    {showEmergencyButton && (

                        <section className="emergency-section">

                            <div className="emergency-text">

                                <strong>
                                    Atención prioritaria
                                </strong>

                                <span>
                                    Si se trata de una emergencia,
                                    solicita ayuda inmediatamente.
                                </span>

                            </div>


                            <button
                                className="emergency-button"
                                onClick={
                                    handleEmergencyCall
                                }
                            >
                                Llamar a emergencias 911
                            </button>

                        </section>

                    )}


                    {/* ==================================
                        DATOS EVALUADOS
                    ================================== */}

                    <section className="clinical-card">

                        <h2>
                            Datos evaluados
                        </h2>


                        <div className="clinical-item">

                            <span>
                                Síntoma inicial
                            </span>

                            <strong>
                                {symptomName}
                            </strong>

                        </div>


                        <div className="clinical-item">

                            <span>
                                Perfil evaluado
                            </span>

                            <strong>
                                {profileId}
                            </strong>

                        </div>


                        <div className="clinical-item symptoms-item">

                            <span>
                                Síntomas presentados
                            </span>


                            <div className="symptom-chips">

                                {symptomsPresented.length > 0 ? (

                                    symptomsPresented.map(
                                        (symptom, index) => (

                                            <span
                                                key={index}
                                                className="symptom-chip"
                                            >
                                                {symptom}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <span className="no-symptoms">
                                        No se registraron síntomas
                                        adicionales.
                                    </span>

                                )}

                            </div>

                        </div>


                        <div className="clinical-item">

                            <span>
                                Padecimientos previos
                            </span>

                            <strong>
                                Información del perfil
                            </strong>

                        </div>

                    </section>


                    {/* ==================================
                        POSIBLES CAUSAS
                    ================================== */}

                    <section className="causes-card">

                        <button
                            className="causes-button"
                            onClick={() =>
                                setShowCauses(
                                    !showCauses
                                )
                            }
                        >

                            <span>
                                Mostrar posibles causas
                            </span>

                            <span className="accordion-arrow">
                                {showCauses ? '⌃' : '⌄'}
                            </span>

                        </button>


                        {showCauses && (

                            <div className="causes-content">

                                <p>
                                    Estas posibilidades son
                                    únicamente orientativas y
                                    no representan un diagnóstico
                                    médico.
                                </p>


                                <ul>

                                    {causes.map(
                                        (cause, index) => (

                                            <li key={index}>
                                                {cause}
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        )}

                    </section>


                    {/* ==================================
                        QUÉ HACER MIENTRAS ESPERA
                    ================================== */}

                    <section className="first-aid-card">

                        <button
                            className="first-aid-button"
                            onClick={() =>
                                setShowFirstAid(
                                    !showFirstAid
                                )
                            }
                        >

                            <span>
                                Qué hacer mientras espera
                            </span>

                            <span className="accordion-arrow">
                                {showFirstAid ? '⌃' : '⌄'}
                            </span>

                        </button>


                        {showFirstAid && (

                            <div className="first-aid-content">

                                <ul>

                                    {firstAidData.map(
                                        (recommendation, index) => (

                                            <li key={index}>
                                                {recommendation}
                                            </li>

                                        )
                                    )}

                                </ul>


                                <p className="first-aid-warning">
                                    Estas recomendaciones son
                                    generales y no sustituyen
                                    la atención médica profesional.
                                </p>

                            </div>

                        )}

                    </section>


                    {/* ==================================
                        DUDA ENTRE RESPUESTAS
                    ================================== */}

                    {hasDoubt && (

                        <section className="doubt-card">

                            <div className="doubt-icon">
                                ?
                            </div>

                            <div>

                                <strong>
                                    Se indicó una duda durante
                                    la evaluación
                                </strong>

                                <p>
                                    Como existió duda entre dos
                                    respuestas, se recomienda que
                                    un profesional de la salud
                                    valide esta valoración para
                                    obtener mayor precisión.
                                </p>

                            </div>

                        </section>

                    )}


                    {/* ==================================
                        RESUMEN DE RESPUESTAS
                    ================================== */}

                    <section className="answers-summary">

                        <h2>
                            Resumen de respuestas
                        </h2>


                        {Object.entries(answers).length > 0 ? (

                            Object.entries(answers).map(
                                ([question, answer]) => (

                                    <div
                                        className="answer-summary-item"
                                        key={question}
                                    >

                                        <span>
                                            Pregunta {Number(question) + 1}
                                        </span>

                                        <strong>
                                            {answer}
                                        </strong>

                                    </div>

                                )
                            )

                        ) : (

                            <p className="no-answers">
                                No hay respuestas registradas.
                            </p>

                        )}

                    </section>


                    {/* ==================================
                        BOTÓN MÉDICO
                    ================================== */}

                    <button
                        className="doctor-button"
                        onClick={handleFindDoctor}
                    >
                        Ubicar Médico
                    </button>


                </div>

            </main>


        </div>

    );

}

export default ResultScreen;