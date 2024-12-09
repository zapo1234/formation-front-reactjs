import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function LogoutIcon({ onLogout }) {
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger l'utilisateur

  // Renommer la fonction logout en handleLogout pour correspondre à l'erreur mentionnée
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    onLogout(); // Mettre à jour l'état d'authentification dans le parent Menu
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <button onClick={handleLogout} className="logout-btn"> {/* Utiliser handleLogout ici */}
      <FaSignOutAlt /> Déconnexion
    </button>
  );
}

export default LogoutIcon;
