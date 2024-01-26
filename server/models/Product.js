const mongoose = require('mongoose')

// Schema
ProductSchema = new mongoose.Schema({
    sku:{
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    title: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    categories: {
        type: Array,
        required:true
    },
    color: {
        type : Array,
        required : true
    },
    size: {
        type : Array,
        required : true
    },
    price:{
        type: Number,
        required: true
    },
    inStock:{
        type: Boolean,
        required: true
    }
},{timestamps: true})

// Schema Configuration

// Static functions

// Methods

// Mongoose middleware methods 

// Export

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product