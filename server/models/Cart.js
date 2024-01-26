const mongoose = require('mongoose')

CartSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
        unique: true
    },
    products:[
        {
            productId:{
                type: String
            },
            quantity:{
                type: Number
            }    
        }
    ]
},{timestamps: true})


// Schema Configuration

// Static functions

// Mongoose middleware methods 

// Middleware

// Export

const Cart = mongoose.model('Cart',CartSchema)

module.exports = Cart