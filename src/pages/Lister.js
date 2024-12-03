// src/pages/Lister.js
import React, { useState } from 'react';
import '../styles/Lister.css'; // Importation du fichier CSS

function Lister() {
  // exmple de data
  const data = [
    { id: 1, name: "Élément 1", description: "Description de l'élément 1" },
    { id: 2, name: "Élément 2", description: "Description de l'élément 2" },
    { id: 3, name: "Élément 3", description: "Description de l'élément 3" },
    { id: 4, name: "Élément 4", description: "Description de l'élément 4" },
    { id: 5, name: "Élément 5", description: "Description de l'élément 5" },
    { id: 6, name: "Élément 6", description: "Description de l'élément 6" },
    { id: 7, name: "Élément 7", description: "Description de l'élément 7" },
    { id: 8, name: "Élément 8", description: "Description de l'élément 8" },
    { id: 9, name: "Élément 9", description: "Description de l'élément 9" },
    { id: 10, name: "Élément 10", description: "Description de l'élément 10" },
    { id: 11, name: "Élément 11", description: "Description de l'élément 11" },
    { id: 12, name: "Élément 12", description: "Description de l'élément 12" },
    { id: 13, name: "Élément 13", description: "Description de l'élément 13" },
    { id: 14, name: "Élément 14", description: "Description de l'élément 14" },
    { id: 15, name: "Élément 15", description: "Description de l'élément 15" },
  ];

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="lister-page">
      <h2>Exercice tableau en react js pagination</h2>

      {/*  grands écrans */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th> {/* Nouvelle colonne pour les actions */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button className="btn btn-info">Voir</button> {/* Bouton d'action */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* affichage sur les écrans mobiles */}
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
