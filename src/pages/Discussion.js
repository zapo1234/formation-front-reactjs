import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';  // Importation de l'icône enveloppe
import '../styles/Formation.css'; // Importation du fichier CSS

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Fonction pour envoyer un message
  const handleSendMessage = (e) => {
    e.preventDefault();

    // Vérifier si le nom et le message sont vides
    if (!name || !message) {
      setError('Nom et message ne peuvent pas être vides !');
      return;
    }

    // Ajouter le message à la liste
    setMessages([...messages, { name, message }]);
    setName('');
    setMessage('');
    setError(''); // vider les erreurs.
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        {/* affiche mes mssages */}
        <Col md={6} sm={12} className="mb-4">
        <FaEnvelope style={{ marginRight: '8px', verticalAlign: 'middle' }} size={15} />
         <span style={{ fontSize: '18px' }}>Messages</span> {/* Réduit la taille du texte */}
        
          <ListGroup>
            {messages.map((msg, index) => (
              <ListGroup.Item key={index}>
                <strong>{msg.name}:</strong> {msg.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Mon formulaire de discussion */}
        <Col md={4} sm={12}>
          <h2 className="text-center">Les Devs chez elyamaje chat en temps réel</h2>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={error && !name}  // Ajout de la classe isInvalid si erreur
              />
              {/* Affichage du message d'erreur pour le nom */}
              {error && !name && (
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {error}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez votre message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                isInvalid={error && !message} // Ajout de la classe isInvalid si erreur
              />
              {/* Affichage du message d'erreur pour le message */}
              {error && !message && (
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {error}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Bouton "Envoyer" */}
            <Button 
              variant="dark"  // couleur noir
              type="submit" 
              block 
              className="mt-2"  
            >
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
