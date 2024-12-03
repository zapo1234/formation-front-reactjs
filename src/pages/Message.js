
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';  // Icons 
import { Link } from 'react-router-dom'; // Importation de Link

import '../styles/Message.css';  // Importation du fichier CSS

function Message() {
  // Exemple de données à afficher non dynamique.
  const messages = [
    { id: 1, from: "Bonjour la teams", text: "Bonjour, comment ça va Denil tu compile ?" },
    { id: 2, from: "React js", text: "Bonjour, tout va bien !" },
    { id: 3, from: "John Doe", text: "Salut, c'est un message de test" },
  ];

  return (
    <div className="message-page container">
      <h2 className="text-center my-4">
      <FaEnvelope style={{ marginRight: '8px', verticalAlign: 'middle' }} size={15} />
      <span style={{ fontSize: '18px' }}>Messages</span> {/* Réduit la taille du texte */}
      </h2>
      <div className="message-list row">
        {messages.map((message) => (
          <div key={message.id} className="message col-12 col-md-6 col-lg-4">
            <div className="message-content p-3 border rounded shadow-sm">
              {/* Lien cliquable avec passage d'ID dans l'URL */}
              <Link to={`/messagedetail/${message.id}`} className="text-decoration-none">
                <p><strong>De:</strong> {message.from}</p>
                <p><strong>Message:</strong> {message.text}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
