const router = require('express').Router()
const User = require('../models/User')
const {
        verifyToken,
        verifyTokenAndAuthorization
} = require('../middleware/authorization')

// Routes
// Get user information 
router.get('/api/users/:id' ,verifyTokenAndAuthorization , async(req,res) =>{
 
try{
    req.user.isAdmin ? user = await User.findById(req.params.id) :  user = req.user
    if(!user){
        return res.status(404).send('user not found')
    }
    res.send(user)
    }catch(e){
        res.status(501).send(e)
    }
})

// UPDATE 
router.patch('/api/users/:id' ,verifyTokenAndAuthorization , async(req,res) =>{
try{
    user = req.user
    user.isAdmin ? user = await User.findById(req.params.id) : user = req.user
    
    const changes =  Object.keys(req.body)
    const allowedChanges = ['password','email']

    const isAllowed = changes.every( (change) => allowedChanges.includes(change) )
    if(!isAllowed){
       return res.status(500).send('check the parameters and check again') 
    }

    changes.forEach((change) => user[change] = req.body[change] )
    await user.save()

    if(!user){
        return res.status(404).send('user not founded')
    }
    res.send(user)
    }catch(e){
        res.status(500).send(e)

    }
})


//



module.exports = router