// URL de l'API Node.js (modifiez en fonction de votre backend)
const API_URL = 'http://localhost:5000/api/auth';  // Exemple d'URL de l'API

/**
 * Fonction pour se connecter avec l'API(connexion users)
 * 
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 */
function login(email, password) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('vos identifiants sont incorrectes !');
      }
      return response.json();  // Retourne les données de la réponse JSON
    });
}

/**
 * Fonction pour gérer la déconnexion de l'utilisateur en appelant l'API.
 */
function logout() {
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Utilisation du token dans le localStorage
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (!response.ok) {
        // Si la réponse n'est pas OK (code 200)
        return { success: false, message: 'Erreur lors de la déconnexion' };
      }

      // Si la déconnexion est réussie, supprimer le token du localStorage
      localStorage.removeItem('authToken');
      return { success: true };
    })
    .catch((error) => {
      // Si l'appel API échoue
      console.error('Erreur de déconnexion:', error);
      return { success: false, message: 'Erreur de réseau ou serveur' };
    });
}

// Exportation des fonctions login et logout
module.exports = { login, logout };
