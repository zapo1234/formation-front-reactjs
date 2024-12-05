import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Correcte importation
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

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/lister" element={<Lister />} />
        <Route path="/message" element={<Message />} />
        <Route path="/messagedetail/:id" element={<MessageDetail />} /> {/* passe les infos avec id. */}
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/codepromo" element={<Codepromo />} />
        <Route path="/uploadFile" element={<UploadFile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


