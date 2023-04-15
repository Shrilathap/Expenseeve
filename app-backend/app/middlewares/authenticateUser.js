const jwt=require('jsonwebtoken')
require('dotenv').config()
const authenticateUser=function(req,res,next){
let token=req.headers["authorization"]
if(token){
    tokenSplit=token.split(' ')[1]
    try{
        const tokenData=jwt.verify(tokenSplit,process.env.JWT_SECRET)
        req.user=tokenData
        next()
        // res.json(tokenData)
    }
    catch(e){
        res.status(400).json(e)
    }
}
else{
    res.status(401).json({
        errors:'invalid token'
    })
}
}
const authorizeUser=(req,res,next)=>{
    if(req.user.role=='admin'){
        next()
    }else{
        res.status(403).json({
            errors:'page not found'
        })
    }
}
module.exports={authenticateUser,authorizeUser}