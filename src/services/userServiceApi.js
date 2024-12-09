// src/services/userServiceApi.js

/**
 * URL de l'API pour récupérer les données des utilisateurs.
 * @constant {string}
 */
const API_URL = 'http://localhost:5000/api/';

/**
 * Récupère la liste de tous les utilisateurs.
 *
 * Cette fonction envoie une requête GET à l'API pour récupérer tous les utilisateurs.
 * Elle utilise un token d'authentification stocké dans le localStorage pour l'autorisation.
 *
 * @returns {Promise<Object[]>} Une promesse qui résout un tableau d'objets utilisateurs.
 * @throws {Error} Si le token est manquant ou expiré, ou si la récupération échoue.
 */
export const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        reject(new Error('Token manquant ou expiré. Veuillez vous reconnecter.'));
        return;
      }

      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        reject(new Error('Erreur lors de la récupération des utilisateurs.'));
        return;
      }

      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error('Erreur API:', error);
      reject(error);
    }
  });
};

/**
 * Récupère un utilisateur spécifique par son ID.
 *
 * Cette fonction envoie une requête GET à l'API pour récupérer un utilisateur en particulier,
 * en utilisant un ID passé en paramètre. Elle utilise un token d'authentification stocké dans
 * le localStorage pour l'autorisation.
 *
 * @param {string|number} userId L'ID de l'utilisateur à récupérer.
 * @returns {Promise<Object>} Une promesse qui résout l'objet de l'utilisateur.
 * @throws {Error} Si le token est manquant ou expiré, ou si la récupération échoue.
 */
export const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        reject(new Error('Token manquant ou expiré. Veuillez vous reconnecter.'));
        return;
      }

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        reject(new Error('Erreur lors de la récupération de l\'utilisateur.'));
        return;
      }

      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error('Erreur API:', error);
      reject(error);
    }
  });
};
