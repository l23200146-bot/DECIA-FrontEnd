
import React, { useRef, useState } from 'react';
import '../styles/SymptomStep1.css';


/* =====================================================
   CUESTIONARIOS DINÁMICOS POR SÍNTOMA
===================================================== */

const questionnaires = {

    /* =========================
       DOLOR DE CABEZA
    ========================= */

    'Dolor de cabeza': [

        {
            question: '¿Qué tan intenso es el dolor?',
            options: [
                'Leve',
                'Moderado',
                'Intenso',
                'Muy intenso',
                'No lo sé'
            ]
        },

        {
            question: '¿Cuándo comenzó el dolor?',
            options: [
                'Hoy',
                'Desde ayer',
                'Hace 2-3 días',
                'Hace más de una semana'
            ]
        },

        {
            question: '¿Cómo describirías el dolor?',
            options: [
                'Presión',
                'Pulsátil',
                'Punzante',
                'Constante',
                'No lo sé'
            ]
        },

        {
            question: '¿En qué zona de la cabeza se presenta?',
            options: [
                'Frente',
                'Parte posterior',
                'Un solo lado',
                'Toda la cabeza',
                'No lo sé'
            ],
            photo: true
        },

        {
            question: '¿Presentas alguno de estos síntomas?',
            options: [
                'Náuseas',
                'Mareo',
                'Visión borrosa',
                'Sensibilidad a la luz',
                'Ninguno'
            ],
            photo: true
        }

    ],


    /* =========================
       DOLOR ABDOMINAL
    ========================= */

    'Dolor abdominal': [

        {
            question: '¿Qué tan intenso es el dolor abdominal?',
            options: [
                'Leve',
                'Moderado',
                'Intenso',
                'Muy intenso',
                'No lo sé'
            ]
        },

        {
            question: '¿Cuándo comenzó el dolor abdominal?',
            options: [
                'Hoy',
                'Desde ayer',
                'Hace 2-3 días',
                'Hace más de una semana'
            ]
        },

        {
            question: '¿Dónde se localiza principalmente el dolor?',
            options: [
                'Parte superior',
                'Parte inferior',
                'Lado derecho',
                'Lado izquierdo',
                'Toda la zona'
            ]
        },

        {
            question: '¿Presentas alguno de estos síntomas?',
            options: [
                'Náuseas',
                'Vómito',
                'Diarrea',
                'Inflamación',
                'Ninguno'
            ],
            photo: true
        },

        {
            question: '¿Cómo ha evolucionado el dolor?',
            options: [
                'Ha disminuido',
                'Se mantiene igual',
                'Ha aumentado',
                'Va y viene',
                'No lo sé'
            ],
            photo: true
        }

    ],


    /* =========================
       DOLOR EN EL PECHO
    ========================= */

    'Dolor en el pecho': [

        {
            question: '¿Qué tan intenso es el dolor?',
            options: [
                'Leve',
                'Moderado',
                'Intenso',
                'Muy intenso',
                'No lo sé'
            ]
        },

        {
            question: '¿Cuándo comenzó el dolor?',
            options: [
                'Hace unos minutos',
                'Hoy',
                'Desde ayer',
                'Hace varios días',
                'No lo sé'
            ]
        },

        {
            question: '¿Cómo describirías el dolor?',
            options: [
                'Presión',
                'Opresión',
                'Ardor',
                'Punzada',
                'No lo sé'
            ]
        },

        {
            question: '¿Dónde se presenta principalmente el dolor?',
            options: [
                'Centro del pecho',
                'Lado izquierdo',
                'Lado derecho',
                'Se extiende a otra zona',
                'No lo sé'
            ],
            photo: true
        },

        {
            question: '¿Presentas alguno de estos síntomas?',
            options: [
                'Falta de aire',
                'Mareo',
                'Sudoración',
                'Náuseas',
                'Ninguno'
            ],
            photo: true
        }

    ],


    /* =========================
       FIEBRE
    ========================= */

    'Fiebre': [

        {
            question: '¿Qué temperatura has registrado?',
            options: [
                'Menos de 37.5 °C',
                '37.5 - 38 °C',
                '38 - 39 °C',
                'Más de 39 °C',
                'No lo sé'
            ]
        },

        {
            question: '¿Desde cuándo tienes fiebre?',
            options: [
                'Hoy',
                'Desde ayer',
                'Hace 2-3 días',
                'Hace más de una semana'
            ]
        },

        {
            question: '¿Presentas alguno de estos síntomas?',
            options: [
                'Escalofríos',
                'Tos',
                'Dolor de garganta',
                'Dolor muscular',
                'Ninguno'
            ]
        },

        {
            question: '¿Presentas alguna manifestación visible?',
            options: [
                'Erupción',
                'Enrojecimiento',
                'Inflamación',
                'Ninguna',
                'No lo sé'
            ],
            photo: true
        },

        {
            question: '¿Cómo se encuentra tu estado general?',
            options: [
                'Me siento bien',
                'Me siento algo débil',
                'Me siento muy débil',
                'Me cuesta realizar actividades',
                'No lo sé'
            ],
            photo: true
        }

    ]

};


/* =====================================================
   COMPONENTE
===================================================== */

function SymptomStep1({
    language,
    theme,
    symptomName,
    profileId,
    onBack,
    onFinish
}) {

    const questions =
        questionnaires[symptomName] ||
        questionnaires['Dolor de cabeza'];


    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [photos, setPhotos] = useState({});

    const [doubts, setDoubts] = useState({});

    const fileInputRef = useRef(null);


    const question = questions[currentQuestion];

    const currentAnswer = answers[currentQuestion];

    const currentPhoto = photos[currentQuestion];

    const doubtActive =
        doubts[currentQuestion] || false;


    const selectedAnswers =
        Array.isArray(currentAnswer)
            ? currentAnswer
            : currentAnswer
                ? [currentAnswer]
                : [];

    /* =====================================================
       SELECCIONAR RESPUESTA
    ===================================================== */

    const handleAnswer = (answer) => {

        const doubtActive =
            doubts[currentQuestion] || false;


        // ==========================================
        // MODO NORMAL: SOLO UNA RESPUESTA
        // ==========================================

        if (!doubtActive) {

            setAnswers({
                ...answers,
                [currentQuestion]: answer
            });

            return;
        }


        // ==========================================
        // MODO DUDA: MÁXIMO 2 RESPUESTAS
        // ==========================================

        const currentAnswers =
            Array.isArray(currentAnswer)
                ? currentAnswer
                : currentAnswer
                    ? [currentAnswer]
                    : [];


        // Si ya está seleccionada, la quitamos
        if (currentAnswers.includes(answer)) {

            const newAnswers =
                currentAnswers.filter(
                    item => item !== answer
                );

            setAnswers({
                ...answers,
                [currentQuestion]: newAnswers
            });

            return;
        }


        // Máximo 2 respuestas
        if (currentAnswers.length >= 2) {
            return;
        }


        const newAnswers = [
            ...currentAnswers,
            answer
        ];


        setAnswers({
            ...answers,
            [currentQuestion]: newAnswers
        });

    };

    //handle 

        const handleDoubtToggle = () => {

        const newDoubt =
            !(doubts[currentQuestion] || false);


        setDoubts({
            ...doubts,
            [currentQuestion]: newDoubt
        });


        // Si se desactiva la duda y había
        // dos respuestas, conservamos solamente
        // la primera.
        if (!newDoubt && Array.isArray(currentAnswer)) {

            setAnswers({
                ...answers,
                [currentQuestion]:
                    currentAnswer[0] || ''
            });
        }

    };
    /* =====================================================
       TOMAR FOTO
    ===================================================== */

    const handlePhoto = (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        const imageUrl = URL.createObjectURL(file);


        setPhotos({
            ...photos,

            [currentQuestion]: {
                file: file,
                url: imageUrl
            }
        });

    };


    /* =====================================================
       ELIMINAR FOTO
    ===================================================== */

    const removePhoto = () => {

        setPhotos({
            ...photos,

            [currentQuestion]: null
        });


        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

    };


    /* =====================================================
       SIGUIENTE PREGUNTA
    ===================================================== */

    const handleContinue = () => {

       if (
            selectedAnswers.length === 0 &&
            !currentPhoto
        ) {
            return;
        }

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

            return;
        }


        /* =================================================
           EVALUACIÓN COMPLETA
        ================================================= */

        const result = {

            symptomName: symptomName,

            profileId: profileId,

            answers: answers,

            processedAnswers: processedAnswers,

            photos: photos,

          doubt: doubts
        };


        if (onFinish) {
            onFinish(result);
        }
        const processedAnswers = {};

                Object.keys(answers).forEach((questionIndex) => {

                    const answer = answers[questionIndex];

                    const questionAnswers =
                        Array.isArray(answer)
                            ? answer
                            : [answer];


                    processedAnswers[questionIndex] =
                        questionAnswers.map((value) => ({

                            answer: value,

                            weight:
                                questionAnswers.length === 2
                                    ? 0.5
                                    : 1

                        }));

                });

    };


    /* =====================================================
       PREGUNTA ANTERIOR
    ===================================================== */

    const handlePrevious = () => {

        if (currentQuestion === 0) {

            if (onBack) {
                onBack();
            }

            return;
        }


        setCurrentQuestion(currentQuestion - 1);

    };


    /* =====================================================
       PROGRESO
    ===================================================== */

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    return (

        <div className={`symptom-screen ${theme === 'dark' ? 'dark-mode' : ''}`}>


            {/* =========================
                HEADER
            ========================= */}

            <header className="symptom-header">

                <button
                    className="symptom-back"
                    onClick={handlePrevious}
                    aria-label="Regresar"
                >
                    ‹
                </button>


                <div className="symptom-header-info">

                    <span>
                        Evaluación
                    </span>


                    <strong>
                        {currentQuestion + 1}/5
                    </strong>

                </div>

            </header>


            {/* =========================
                BARRA DE PROGRESO
            ========================= */}

            <div className="progress-container">

                <div
                    className="progress-bar"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>


            {/* =========================
                CONTENIDO
            ========================= */}

            <main className="symptom-content">


                {/* SÍNTOMA */}

                <div className="symptom-tag">

                    Síntoma: {symptomName}

                </div>


                {/* =========================
                    PREGUNTA
                ========================= */}

                <section className="question-card">


                    <p className="question-number">

                        Pregunta {currentQuestion + 1} de 5

                    </p>


                    <h1>

                        {question.question}

                    </h1>


                    {/* OPCIONES */}

                    <div className="answer-list">

                        {question.options.map((option) => (

                            <button
                                key={option}
                               className={`answer-option ${
                                    selectedAnswers.includes(option)
                                        ? 'selected'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleAnswer(option)
                                }
                            >

                                <span className="answer-circle">

                                   {selectedAnswers.includes(option)
                                        ? '✓'
                                        : ''
                                    }

                                </span>


                                {option}

                            </button>

                        ))}

                    </div>


                    {/* =========================
                        CÁMARA
                    ========================= */}

                    {question.photo && (

                        <div className="photo-section">


                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden-file-input"
                                onChange={handlePhoto}
                            />


                            {!currentPhoto ? (

                                <button
                                    className="photo-button"
                                    onClick={() =>
                                        fileInputRef.current.click()
                                    }
                                >
                                    📷 Tomar foto
                                </button>

                            ) : (

                                <div className="photo-preview">

                                    <img
                                        src={currentPhoto.url}
                                        alt="Vista previa"
                                    />


                                    <button
                                        onClick={removePhoto}
                                    >
                                        Eliminar foto
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </section>


                {/* =========================
                    TOGGLE
                ========================= */}

                <div className="doubt-container">

                    <span>
                        Dudo entre dos respuestas
                    </span>


                   <button
                        className={`toggle ${
                            doubtActive ? 'on' : ''
                        }`}
                        onClick={handleDoubtToggle}
                        aria-label="Dudo entre dos respuestas"
                    >

                        <span />

                    </button>

                </div>


                {/* =========================
                    BOTÓN CONTINUAR
                ========================= */}

                <button
                    className="continue-button"
                    disabled={
                        selectedAnswers.length === 0 &&
                        !currentPhoto
                    }
                    onClick={handleContinue}
                >

                    {currentQuestion === 4
                        ? 'Ver resultado'
                        : 'Enviar y Continuar'
                    }

                </button>


            </main>

        </div>

    );

}


export default SymptomStep1;

