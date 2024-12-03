// src/pages/Login.js
import React from 'react';
import '../styles/Login.css'; // Importation du fichier CSS

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">

       <img src="/assets/logo_elyamaje.png" alt="Logo" className="logo"  width="110" height="80"/>
        <h2>Connexion</h2>

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
