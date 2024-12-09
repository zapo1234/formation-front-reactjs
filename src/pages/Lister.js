import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userServiceApi';  // Importer la fonction getUsers
import '../styles/Lister.css'; // Importation du fichier CSS

function Lister() {
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  
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
        setLoading(false); 
      })
      .catch((error) => {
        setError(error.message); // Gérer l'erreur
        setLoading(false); // Fin du chargement
      });
  }, []); 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Chargement...</div>; // Afficher pendant le chargement
  }

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
              <th>Status de compte</th>
              <th>Action</th> {/* Nouvelle colonne pour les actions */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.attribut}</td>

                <td>
                  <button className="btn btn-info">Voir</button> {/* Bouton d'action */}
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
                <p className="block-description">{item.description}</p>
                <button className="btn btn-info">Voir</button> {/* Bouton d'action */}
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
    </div>
  );
}

export default Lister;
