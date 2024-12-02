const express= require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Thing = require('./Models/thing')
require('dotenv').config(); 
const path=require('path')
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://heritier:<edems0309>@cluster0.u4rf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  tls: true, // Active SSL/TLS
  tlsInsecure: true, // Permet de contourner les erreurs de certificats (utilisez seulement en dev)
  retryWrites: true,
  w: 'majority',
}
)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error(err))







const stuffRoute= require('./Route/stuff')
const userRoutes = require('./Route/user');




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('api/stuff', stuffRoute)
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports =app
