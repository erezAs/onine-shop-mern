// Middleware authorization , Verify Tokens
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyToken = async (req,res,next) =>{

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({'_id': decoded._id,'tokens.token':token})
 
        if(!user){
            throw new Error('Unable to connect, try login again')
        }

        req.user = user
        req.token = token

        next()
    }catch(e){
       // console.log(e)
        res.status(401).send('error:Please authenticate.')
    }
}

const verifyTokenAndAuthorization = async(req,res ,next) =>{
    verifyToken(req,res, ()=>{
 
        if(req.user.id === req.params.id || req.user.isAdmin){
             next()
        }else{
            res.status(403).send('permission denied')
        }
    })

}

const verifyTokenAdmin = async(req,res , next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).send('permission denied')
        }
    })

}





module.exports = {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenAndAuthorization
}