const jwt=require('jsonwebtoken')
module.exports=(res,req,next) =>{
    try {
        const token=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token,'RANDOM_TOKEN_SECRET')
       const userId=decoded.userId
       req.auth={
         userId:userId,
       }
        
    } catch (error) {
       res.status(401).json({error}) 
    }
}