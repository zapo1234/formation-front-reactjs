import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Vérifiez si un token est existe

  // Si le token n'est pas présent, rediriger l'utilisateur vers la page de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, afficher l'élément (page de profil par exemple)
  return element;
};

export default PrivateRoute;
