const express= require('express')
const route=express.Router();

const userCtrl=require('../controllers/user')

route.post('/',userCtrl.signup)

route.post('/login',userCtrl.login)




module.exports=route;