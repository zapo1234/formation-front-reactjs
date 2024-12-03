import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';  // Import de l'icône de poubelle
import '../styles/Codepromo.css'; // Importation du fichier CSS

function App() {
  // Un tableau pour récupérer les lignes du form
  const [inputs, setInputs] = useState([{ nom: '', prenom: '', email: '', phone: '' }]);

  // Ajouter une nouvelle ligne
  const handleAddLine = () => {
    setInputs([...inputs, { nom: '', prenom: '', email: '', phone: '' }]);
  };

  // Mettre à jour les lignes
  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  // Supprimer une ligne
  const handleRemoveLine = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  // soumettre mon formulaire.
  const handleSubmit = (e) => {
    e.preventDefault();
    // je veux valider mon formulaire si les champs 3 champs...
  const isFormValid = inputs.some(input => input.nom.trim() !== '' || input.prenom.trim() !== '' || input.email.trim() !== '');
       if(isFormValid){

        // traiter les datas et creer un code promo et renvoi tableau objet.
        const modifiedInputs = inputs.map(input => {
        // Générer un nombre aléatoire entre 0 et 7
        const random = Math.floor(10000 + Math.random() * 90000); // Valeur entre 10000 et 99999
       // Créer le code promo : Nom (5 premières lettres) + Prénom (4 premières lettres) + nombre aléatoire + "-10"
        const codePromo = `${input.nom.slice(0, 5).toLowerCase()}-${input.prenom.slice(0, 4).toLowerCase()}-${random}-10`;
        return {
        // Récupérer les 5 premières lettres du nom
        nom: input.nom.slice(0, 5),
        // Récupérer les 4 premières lettres du prénom...
        prenom: input.prenom.slice(0, 4),
           // Garder l'email tel quel
        email: input.email,
         // Remplacer le champ phone par -10
        phone: input.phone,
           // Ajouter le code promo
        codePromo: codePromo,
      };
    });

       // afficher le tableau d'objet  et envoyer le via api
       alert(`datas: \n${JSON.stringify(modifiedInputs, null, 2)}`);
       //alert(`datas: \n${JSON.stringify(inputs, null, 2)}`);
       }else{
           alert('les champs nom,prenom et mails doivent etre remplir');
       }

    
  };

  return (
    <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <div className="text-center mb-4">
            <h1 className="title">Crée des codes promos</h1>
          </div>

          {/* Le bouton "Ajouter une ligne" */}
          <Row className="mb-3">
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={handleAddLine}
                className="w-100"
                style={{
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                }}
              >
                Ajouter une ligne
              </Button>
            </Col>
          </Row>

          {/* Affichage des lignes d'inputs */}
          <Form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <div key={index} className="mb-3">
                <Row className="d-flex align-items-center">
                  {/* Mes champs de formulaire */}
                  <Col xs={12} md={3} lg={3} className="mb-2">
                    <Form.Group controlId={`formNom-${index}`}>
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nom"
                        value={input.nom}
                        onChange={(e) => handleChange(index, 'nom', e.target.value)}
                        className="w-100"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={3} lg={3} className="mb-2">
                    <Form.Group controlId={`formPrenom-${index}`}>
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Prénom"
                        value={input.prenom}
                        onChange={(e) => handleChange(index, 'prenom', e.target.value)}
                        className="w-100"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={3} lg={3} className="mb-2">
                    <Form.Group controlId={`formEmail-${index}`}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                        className="w-100"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={3} lg={3} className="mb-2">
                    <Form.Group controlId={`formPhone-${index}`}>
                      <Form.Label>Numéro de tel</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Numéro de téléphone"
                        value={input.phone}
                        onChange={(e) => handleChange(index, 'phone', e.target.value)}
                        className="w-100"
                      />
                    </Form.Group>
                  </Col>

                  {/* Bouton delete avec icône de poubelle */}
                  <Col xs="auto" md="auto" lg="auto" className="mb-2">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveLine(index)}
                      style={{
                        backgroundColor: 'red',
                        borderColor: 'red',
                        color: 'white',
                      }}
                      className="d-flex align-items-center w-100"
                    >
                      <Trash size={18} style={{ marginRight: '8px' }} /> {/* L'icône poubelle */}
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            
            {/* Bouton Valider le formulaire */}
            <Row className="mt-4">
              <Col xs="auto">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  style={{
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                  }}
                >
                  Valider le formulaire
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
