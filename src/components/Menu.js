import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importer useNavigate
import { FaBars, FaTimes, FaSignInAlt, FaListAlt, FaEnvelope, FaComments, FaGift, FaUser, FaSignOutAlt } from 'react-icons/fa'; 
import '../styles/Menu.css';

function Menu({ isAuthenticated, onLogout }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();  // Utiliser useNavigate pour la redirection

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();  // Appeler la fonction de déconnexion passée en prop
    navigate('/login');  // Rediriger vers la page de login après déconnexion
  };

  return (
    <nav className="menu">
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
        {!isAuthenticated ? (
          <>
            <li><Link to="/login" onClick={closeMenu}><FaSignInAlt /> Se connecter</Link></li>
            <li><Link to="/message" onClick={closeMenu}><FaEnvelope /> Messages</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/discussion" onClick={closeMenu}><FaComments /> Discussion</Link></li>
            <li><Link to="/codepromo" onClick={closeMenu}><FaGift /> Formulaire code promo</Link></li>
            <li><Link to="/lister" onClick={closeMenu}><FaListAlt /> Listes users</Link></li>
            <li><Link to="/uploadfile" onClick={closeMenu}><FaGift /> Upload file</Link></li>
            <li><Link to="/profile" onClick={closeMenu}><FaUser /> Profil</Link></li>
            <li><button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Déconnexion</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
