// URL de l'API Node.js (modifiez en fonction de votre backend)

const API_URL = process.env.API_URL_AUTH;

// Fonction pour se connecter
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Échec de la connexion');
    }

    const data = await response.json();

    // Stocker les données dans le localStorage
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('email', email);

    return data; // Retourne les données pour usage dans le composant
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

// Fonction pour récupérer les données utilisateur
export const getUserData = () => {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  if (userId && email) {
    return { userId, email };
  }

  return null;  // Si aucune donnée trouvée
};

// Fonction pour se déconnecter
export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
};
