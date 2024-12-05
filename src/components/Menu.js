import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaListAlt, FaEnvelope, FaComments, FaGift } from 'react-icons/fa'; // Importer les icônes
import '../styles/Menu.css';

function Menu() {
  // Etat pour afficher ou masquer le menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fonction pour fermer le menu après un clic
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="menu">
      {/* Icone hamburger visible sur petits écrans */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menu responsive */}
      <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/login" onClick={closeMenu}><FaSignInAlt /> Se connecter</Link></li>
        <li><Link to="/lister" onClick={closeMenu}><FaListAlt /> Lister</Link></li>
        <li><Link to="/message" onClick={closeMenu}><FaEnvelope /> Messages</Link></li>
        <li><Link to="/discussion" onClick={closeMenu}><FaComments /> Discussion</Link></li>
        <li><Link to="/codepromo" onClick={closeMenu}><FaGift /> Formulaire code promo</Link></li>
        <li><Link to="/uploadfile" onClick={closeMenu}><FaGift /> Upload file</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
