const mongoose = require('mongoose')
const validator = require('validator')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
// Schema
UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens:[
        {
           token:{
               type: String
           }
        }
    ]

},{timestamps: true}) 


// Static functions
UserSchema.statics.findByCredentials = async (username, password) =>{

    validator.isEmail(username) ? username = {email : username} : username = {username}

    const user = await User.findOne(username)
    if(!user){
        throw new Error('Wrong credentials')
    }
    
    const decryptPassword = await CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_AES_SECRET).toString(CryptoJS.enc.Utf8)
    if(decryptPassword != password){
        throw new Error('Wrong credentials')
    }

     

    return user
}


// Methods
UserSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = await jwt.sign(
        {
            _id: user._id,
        }, 
            process.env.JWT_SECRET, 
        {
            expiresIn:"3d"
        })

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token
}


// Mongoose middleware methods 
//-save()
UserSchema.pre('save' , async function(next){
    const user = this
    
    if(user.isModified('password')){
        // Hashing password with AES algorithm
        user.password = await CryptoJS.AES.encrypt(user.password, process.env.CRYPTO_AES_SECRET).toString()
    }


})

// Schema Configuration
UserSchema.methods.toJSON = function() {
    user = this
    objectUser = user.toObject()
    delete objectUser.password
    delete objectUser.tokens
    delete objectUser.isAdmin
    delete objectUser.createdAt
    delete objectUser.updatedAt
    delete objectUser.__v
     
    return objectUser    
}


// package all the method and schema and export it. 
const User = mongoose.model('User', UserSchema)

module.exports = User