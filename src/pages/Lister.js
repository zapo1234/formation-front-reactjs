import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userServiceApi';  // Importer la fonction getUsers
import '../styles/Lister.css'; // Importation du fichier CSS
import { Modal, Button } from 'react-bootstrap'; // Importer le Modal et Button de react-bootstrap

function Lister() {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null); // État pour l'utilisateur sélectionné
  const [showModal, setShowModal] = useState(false); // État afficher ou fermer le modal.

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Récupérer les utilisateurs via l'API
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data); // Sauvegarder les utilisateurs dans l'état
        
      })
      .catch((error) => {
        setError(error.message); // Gérer l'erreur
        
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewClick = (id) => {
    // Trouver l'utilisateur par son ID
    const user = users.find((user) => user.id === id);
    setSelectedUser(user); 
    setShowModal(true); // Afficher le modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fermer le modal
    setSelectedUser(null); // 
  };


  if (error) {
    return <div>Erreur: {error}</div>; // Afficher en cas d'erreur
  }

  return (
    <div className="lister-page">
      <h2>Afficher les utilisateurs de compte dans la BDD</h2>

      {/* Grands écrans */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Action</th> {/* Nouvelle colonne pour les actions */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.identifier}</td>
                <td>{item.email}</td>


                <td>
                  <button className="btn btn-info" onClick={() => handleViewClick(item.id)}>
                    Voir
                  </button> {/* Bouton d'action */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage sur les écrans mobiles */}
      <div className="d-block d-md-none">
        <div className="row">
          {currentItems.map((item) => (
            <div key={item.id} className="col-12 mb-4">
              <div className="block">
                <h5 className="block-title">{item.name}</h5>
                <p className="block-description">{item.username}</p>
                <p className="block-description">{item.email}</p>
                <button className="btn btn-info" onClick={() => handleViewClick(item.id)}>
                  Voir
                </button> {/* Bouton d'action */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          className="btn btn-light"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`btn btn-light ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-light"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

      {/* Modal de details */}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Détails de l'utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Nom:</strong> {selectedUser.name}</p>
            <p><strong>Prénom:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status de compte:</strong> {selectedUser.attribut}</p>
            {/* Ajouter d'autres informations si nécessaire */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Lister;
