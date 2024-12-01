const express= require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Thing = require('./Models/thing')

require('dotenv').config(); // Assurez-vous que dotenv est chargé en premier

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

app.post('/api/stuff', (req, res) => {
delete req.body._id
  const Thing = new Thing({
  ...req.body
})
Thing.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }))
  });

app.get('/api/stuff', (req, res, next) => {
  Thing.find()
     .then(things => res.status(200).json(things))
     .catch(error => res.status(400).json({ error })) 
  
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }))
})

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({_id: req.params.id}),
  { ...req.body, _id: req.params.id }
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }))
})

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
})
module.exports =app