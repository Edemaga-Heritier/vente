const express= require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Thing = require('./Models/thing')
require('dotenv').config(); 

const stuffRoute= require('./Route/stuff')

const mongoose = require('mongoose');

// Définissez ici l'URI de votre base de données MongoDB
const uri ='mongodb+srv://heritier:<edems0309>@cluster0.u4rf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Vérifiez que l'URI est définie
if (!uri) {
  console.error('Erreur : URI MongoDB non défini.');
  process.exit(1); // Quitte l'application si l'URI est manquant
}

// Connexion à MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => {
    console.error('Connexion à MongoDB échouée :', err.message);
    process.exit(1); // Quitte l'application si la connexion échoue
  });




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('api/stuff', stuffRoute)

module.exports =app
