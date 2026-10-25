import React, { useState } from 'react';
import '../styles/RegisterScreen.css';


function RegisterScreen({ onBackToLogin, onRegisterSuccess }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [showPrivacy, setShowPrivacy] = useState(false);

    const getPasswordStrength = () => {
        if (!password) {
            return {
                level: '',
                text: '',
                width: '0%'
            };
        }

        let score = 0;

        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            return {
                level: 'weak',
                text: 'Débil',
                width: '33%'
            };
        }

        if (score <= 3) {
            return {
                level: 'medium',
                text: 'Media',
                width: '66%'
            };
        }

        return {
            level: 'strong',
            text: 'Fuerte',
            width: '100%'
        };
    };

    const passwordStrength = getPasswordStrength();

    const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        };

    const isFormValid =
        fullName.trim().length >= 3 &&
        isValidEmail(email) &&
        password.length >= 6 &&
        confirmPassword === password &&
        acceptedTerms;

    const handlePhoneChange = (value) => {
        let cleanPhone = value.replace(/[^\d+]/g, '');

        if (cleanPhone.startsWith('+52')) {
            const numbers = cleanPhone.substring(3).replace(/\D/g, '');

            if (numbers.length > 10) {
                cleanPhone = '+52' + numbers.substring(0, 10);
            }
        }

        setPhone(cleanPhone);
    };

    const handleRegister = (event) => {
        event.preventDefault();

        setError('');
        setSuccess('');

        if (fullName.trim().length < 3) {
            setError('Ingresa tu nombre completo.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Ingresa un correo electrónico válido.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener mínimo 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (!acceptedTerms) {
            setError('Debes aceptar el Aviso de Privacidad y los Términos de DECIA.');
            return;
        }

        const existingUser = localStorage.getItem('deciaRegisteredUser');

        if (existingUser) {
            try {
                const savedUser = JSON.parse(existingUser);

                if (
                    savedUser.email &&
                    savedUser.email.toLowerCase() === email.trim().toLowerCase()
                ) {
                    setError('Este correo ya está registrado.');
                    return;
                }
            } catch (parseError) {
                console.error('Error al leer usuario registrado:', parseError);
            }
        }

        setLoading(true);

        setTimeout(() => {
            const newUser = {
                name: fullName.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                phone: phone.trim(),
                verified: false,

                profile: {
                    name: fullName.trim(),
                    isPrimary: true
                },

                createdAt: new Date().toISOString()
            };

            localStorage.setItem(
                'deciaRegisteredUser',
                JSON.stringify(newUser)
            );

            setLoading(false);
            setSuccess('¡Cuenta creada exitosamente!');

            setTimeout(() => {
                if (onRegisterSuccess) {
                    onRegisterSuccess(newUser);
                } else if (onBackToLogin) {
                    onBackToLogin();
                }
            }, 1200);
        }, 900);
    };

    return (
        <div className="register-screen">

            <header className="register-header">
                <button
                    type="button"
                    className="register-back-button"
                    onClick={onBackToLogin}
                >
                    &lt; Regresar
                </button>

                <div className="register-header-content">
                    <h1>Crear Cuenta</h1>
                    <p>Ingresa tus datos para registrarte</p>
                </div>
            </header>

            <main className="register-content">

                <div className="register-card">

                    <div className="register-logo">
                        <img
                            src={require('../assets/DECIA.webp')}
                            alt="DECIA"
                        />
                    </div>

                    <form onSubmit={handleRegister}>

                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="register-success">
                                {success}
                            </div>
                        )}

                        <div className="register-field">
                            <label>Nombre Completo *</label>

                            <div className="register-input-wrapper">
                                <span className="register-icon">U</span>

                                <input
                                    type="text"
                                    placeholder="Nombre y Apellidos"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />

                                {fullName && (
                                    <button
                                        type="button"
                                        className="clear-input"
                                        onClick={() => setFullName('')}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {fullName.length > 0 && fullName.trim().length < 3 && (
                                <small className="field-error">
                                    Mínimo 3 caracteres.
                                </small>
                            )}
                        </div>

                        <div className="register-field">
                            <label>Correo Electrónico *</label>

                            <div
                                className={`register-input-wrapper ${
                                    email && !isValidEmail(email)
                                        ? 'input-invalid'
                                        : ''
                                }`}
                            >
                                <span className="register-icon">@</span>

                                <input
                                    type="email"
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {email && (
                                    <button
                                        type="button"
                                        className="clear-input"
                                        onClick={() => setEmail('')}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {email && !isValidEmail(email) && (
                                <small className="field-error">
                                    Ingresa un correo válido.
                                </small>
                            )}
                        </div>

                        <div className="register-field">
                            <label>Contraseña *</label>

                            <div className="register-input-wrapper">
                                <span className="register-icon">●</span>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>

                            {password && (
                                <div className="password-strength">
                                    <div className="strength-track">
                                        <div
                                            className={`strength-bar ${passwordStrength.level}`}
                                            style={{
                                                width: passwordStrength.width
                                            }}
                                        />
                                    </div>

                                    <span
                                        className={`strength-text ${passwordStrength.level}`}
                                    >
                                        {passwordStrength.text}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="register-field">
                            <label>Confirmar Contraseña *</label>

                            <div
                                className={`register-input-wrapper ${
                                    confirmPassword &&
                                    confirmPassword !== password
                                        ? 'input-invalid'
                                        : ''
                                }`}
                            >
                                <span className="register-icon">●</span>

                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Repite tu contraseña"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword
                                        ? 'Ocultar'
                                        : 'Mostrar'}
                                </button>
                            </div>

                            {confirmPassword &&
                                confirmPassword !== password && (
                                    <small className="field-error">
                                        Las contraseñas no coinciden.
                                    </small>
                                )}
                        </div>

                        <div className="register-field">
                            <label>Teléfono (Opcional)</label>

                            <div className="register-input-wrapper">
                                <span className="register-icon">+</span>

                                <input
                                    type="tel"
                                    placeholder="+52 555 123 4567"
                                    value={phone}
                                    onChange={(e) =>
                                        handlePhoneChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="privacy-check">
                            <input
                                type="checkbox"
                                id="privacyCheck"
                                checked={acceptedTerms}
                                onChange={(e) =>
                                    setAcceptedTerms(e.target.checked)
                                }
                            />

                            <label htmlFor="privacyCheck">
                                Acepto el{' '}
                                <button
                                    type="button"
                                    className="privacy-link"
                                    onClick={() => setShowPrivacy(true)}
                                >
                                    Aviso de Privacidad
                                </button>{' '}
                                y Términos de DECIA
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="register-submit"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="register-spinner"></span>
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </button>

                    </form>

                    <div className="register-login-link">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            type="button"
                            onClick={onBackToLogin}
                        >
                            Inicia sesión
                        </button>
                    </div>

                </div>
            </main>

            {showPrivacy && (
                <div className="privacy-modal-overlay">
                    <div className="privacy-modal">

                        <button
                            type="button"
                            className="privacy-close"
                            onClick={() => setShowPrivacy(false)}
                        >
                            ×
                        </button>

                        <h2>Aviso de Privacidad</h2>

                        <p>
                            En DECIA, la privacidad de tus datos es importante.
                            La información proporcionada se utilizará para
                            ofrecer las funciones de orientación y seguimiento
                            dentro de la aplicación.
                        </p>

                        <p>
                            Los datos relacionados con la salud deben ser
                            tratados de manera responsable y únicamente para
                            las finalidades informadas al usuario.
                        </p>

                        <p>
                            DECIA proporciona orientación informativa y no
                            sustituye la valoración de un profesional de la
                            salud.
                        </p>

                        <button
                            type="button"
                            className="privacy-accept"
                            onClick={() => setShowPrivacy(false)}
                        >
                            Entendido
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}

export default RegisterScreen;