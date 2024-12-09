import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

function Profile() {
  // Récupérer les données stockées dans localStorage
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');


  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center">
            <h1>Information sur l'utilisateur</h1>
            {/* Vérifiez si l'utilisateur est authentifié */}
            {token ? (
              <div className="d-flex justify-content-center align-items-center">
                <Alert variant="success" className="w-100">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <p>
                      Bonjour je suis bien connecté, voici votre Email : <strong>{email}</strong>
                    </p>
                    
                  </div>
                </Alert>
              </div>
            ) : (
              <Alert variant="danger">
                <p>Vous devez être connecté pour accéder à cette page.</p>
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;