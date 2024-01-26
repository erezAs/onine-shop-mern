const router = require('express').Router()
const User = require('../models/User')
const  {
    verifyToken
} = require('../middleware/authorization')


// Routes

//- Register
router.post('/api/auth/register', async (req,res) =>{
    const user = new User(req.body)

    try{
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
})

//- Login
router.post('/api/auth/login', async (req,res) =>{
    const password = req.body.password
    const username = req.body.username

    try{
        const user = await User.findByCredentials(username, password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(500).send(e)
    }

})

//- Logout
router.post('/api/auth/logout',verifyToken , async (req,res) =>{
    const correctToken = req.token
    let user = req.user

    try{
        user.tokens = await user.tokens.filter((token) => token.token != correctToken)
        await user.save()
        res.send('logout successful')
    }catch(e){
        res.status(500).send(e)
    }
})

//- Logout all session
router.post('/api/auth/logout-all',verifyToken , async(req,res) =>{
    const user = req.user

    try{
        user.tokens = []
        await user.save()
        res.send('all user session is terminated')
    }catch(e){
        res.status(500).send(e)
    }
})

//- Delete user
router.delete('/api/auth/delete-user',verifyToken , async(req,res) =>{
    const user = req.user
 
    try{
     await User.findByIdAndDelete(user._id)
     // todo delete profile and cart fo this user
     res.send('User has been deleted!')
    }catch(e){

        res.status(500).send(e)
    }

})

module.exports = router
