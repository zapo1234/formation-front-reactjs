import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Login from './pages/Login';
import Lister from './pages/Lister';
import Message from './pages/Message';
import UploadFile from './pages/UploadFile';
import MessageDetail from './pages/MessageDetail';
import Codepromo from './pages/Codepromo';
import Profile from './pages/Profile';
import Discussion from './pages/Discussion';
import Footer from './components/Footer';
import Menu from './components/Menu';
import PrivateRoute from './components/PrivateRoute'; // Importer le composant PrivateRoute(sécurisation de mes pages)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifiez si un utilisateur est connecté au chargement de la page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction de gestion de la connexion, appelée depuis le composant Login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // l'etat de de deconnexion.
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header />
      {/* modifier le menu en temp reel en fonction de la connexion du user */}
      <Menu isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/message" element={<Message />} />
        <Route path="/lister" element={<PrivateRoute element={<Lister />} />} />
        <Route path="/messagedetail/:id" element={<PrivateRoute element={<MessageDetail />} />} /> {/* Passe les infos avec id. */}
        <Route path="/discussion" element={<PrivateRoute element={<Discussion />} />} />
        <Route path="/codepromo" element={<PrivateRoute element={<Codepromo />} />} />
        <Route path="/uploadFile" element={<PrivateRoute element={<UploadFile />} />} />
        {/* Route protégée de profil utilisateur connecté */}
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;