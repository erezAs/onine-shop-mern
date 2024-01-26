const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    orderId:{
       type: String,
       require: true 
    },
    products:[
        {
            productId:{
                type: String
            },
            quantity:{
                type: String
            }
        }
    ],
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'pending',
    }
},{timestamps: true})




// Schema Configuration

// Static functions

// Methods

// Mongoose middleware methods 

// Export

const Order = mongoose.model('Order',OrderSchema)

module.exports = Order