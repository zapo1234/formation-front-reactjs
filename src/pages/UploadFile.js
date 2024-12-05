import React, { useState } from 'react';

const DragAndDropFileUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError(null);
    setSuccess(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setError(null);
    setSuccess(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Veuillez sélectionner un fichier avant de soumettre.');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    // Simuler un upload avec une barre de progression
    const uploadInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(uploadInterval);
          setSuccess(true);
          setIsUploading(false);
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '90%', maxWidth: '500px' }}>
        <h3 className="text-center mb-3">Uploader un fichier</h3>
        <form onSubmit={handleSubmit}>
          {/* Zone de glisser-déposer */}
          <div
            className="drop-zone p-4 mb-3 text-center border border-dashed"
            style={{ borderRadius: '8px', backgroundColor: '#f7f7f7' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Glissez-déposez un fichier !</p>
            <input type="file" onChange={handleFileChange} className="d-none" id="fileInput" />
            <label htmlFor="fileInput" className="btn btn-outline-primary w-100">
              Choisir un fichier
            </label>
          </div>

          {/* Affichage du fichier sélectionné */}
          {file && (
            <div className="mb-3">
              <p><strong>Fichier sélectionné :</strong> {file.name}</p>
            </div>
          )}

          {/* Barre de progression */}
          {isUploading && (
            <div className="mb-3">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
            </div>
          )}

          {/* Bouton d'envoi */}
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-dark w-100" disabled={isUploading}>
              {isUploading ? 'Téléchargement...' : 'Envoyer'}
            </button>
          </div>
        </form>

        {/* Messages de statut */}
        {error && <p className="text-center text-danger">{error}</p>}
        {success && <p className="text-center text-success">Téléchargement réussi !</p>}
      </div>
    </div>
  );
};

export default DragAndDropFileUpload;
