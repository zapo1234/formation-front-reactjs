import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour gérer la redirection
import { login } from '../services/authServiceApi'; // Importation du service
import '../styles/Login.css';

function Login({ onLogin }) {  
  // Etats pour gérer les champs de saisie.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(false);

  const navigate = useNavigate();  // redirection

  useEffect(() => {
    if (loginAttempt) {
      const performLogin = async () => {
        setErrorMessage('');  // Réinitialise le message d'erreur

        try {
          // Appeler la fonction login du service
          const data = await login(email, password);
          // stocker les infos utile...
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('email', data.session.userEmail);
          localStorage.setItem('id', data.session.userId);
      
          onLogin();  // Cette fonction mettra à jour l'état dans le parent
           // Redirection vers la page de profil ou d'accueil
          navigate('/profile');  
        } catch (error) {
          setErrorMessage(error.message);  // récupérer le message d'erreur
        } finally { 
          setLoginAttempt(false);
        }
      };

      performLogin(); // Appeler la fonction de connexion
    }
  }, [loginAttempt, email, password, navigate, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();  // Empêche le rechargement de la page lors de la soumission du formulaire
    setLoginAttempt(true);  
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/assets/logo_elyamaje.png" alt="Logo" className="logo" width="200" height="60" />
        <h2>Connexion</h2>

        {/* Affichage du message d'erreur */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="email">Votre identifiant</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Met à jour l'état du nom d'utilisateur
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
            required
          />
        </div>

        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
