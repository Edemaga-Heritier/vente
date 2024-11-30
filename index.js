const Http = require('http')
const app = require('./app')
const { ok } = require('assert')

const server=Http.createServer(app)
app.set('port',process.env.PORT || 3000)
app.use((req, res, next)=>{
  res.status(201)
    next()
})

app.use((req, res) =>{
    res.json({message:'Votre requête a bien été reçue !'})
})


server.listen(process.env.PORT || 3000)
