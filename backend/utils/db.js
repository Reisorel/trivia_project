const { Pool } = require('pg');
const dotenvResult = require('dotenv').config({ path: './config/.env' }); // Charger le fichier .env avec le bon chemin

if (dotenvResult.error) {
  console.error('Erreur de chargement du fichier .env', dotenvResult.error);
} else {
  console.log('Fichier .env chargé correctement');
}

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log pour vérifier la variable DATABASE_URL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Active SSL tout en désactivant la vérification stricte du certificat
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully!');
  }
});

module.exports = pool;
