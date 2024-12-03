import React from 'react';
import { useParams } from 'react-router-dom';

function MessageDetail() {
  // Récupération de l'ID du message depuis l'URL
  const { id } = useParams();

  return (
    <div className="message-detail container">
      <h2>Détails du message {id}</h2>
      <p>Contenu du message pour l'ID: {id}</p>
    </div>
  );
}

export default MessageDetail;
