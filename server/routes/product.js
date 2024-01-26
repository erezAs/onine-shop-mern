const router = require('express').Router()
const Product = require('../models/Product')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin
} = require('../middleware/authorization')
const { findById } = require('../models/Product')


// Routes
//CREATE
router.post('/api/products/',verifyTokenAdmin ,async (req,res) =>{
    const product = new Product(req.body)

    try{
        await product.save()
        res.status(201).send(product)
    }catch(e){
        res.status(500).send(e)
    }
})

//UPDATE
router.patch('/api/products/:id',verifyTokenAdmin,async(req,res) =>{

    try{
        const productId = req.params.id
        const allowedUpdates = ['sku','title','description','categories','images','color','price',]
        const updatesArray = Object.keys(req.body)
    
        isAllowed = updatesArray.every((update) => allowedUpdates.includes(update))

        if(!isAllowed){
            return res.status(500).send('something goes wrong, check parameters and try again.')
        }

        product = await Product.findByIdAndUpdate(productId, req.body, {new:true , runValidators: true, context: 'query'})
        if(!product){
            return res.status(404).send('Product not founded')
        }
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})

//DELETE
router.delete('/api/products/:id' ,verifyTokenAdmin, async(req,res) =>{

    try{
        const productId = req.params.id
        product = await Product.findByIdAndDelete(productId)
        if(!product){
            return res.status(404).send('Product not founded.')
        }

        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})


//GET PRODUCT
router.get('/api/products/find/:id', async(req,res) =>{
    try{
        const productId = req.params.id
        product = await Product.findById(productId)
        if(!product){
            return res.status(404).send('Product not founded.')
        } 
        console.log('request a product')
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})


//GET ALL PRODUCTS
router.get('/api/products', async(req,res) =>{

    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(6); //sort by add date
      } else if (qCategory) {
        products = await Product.find({ // get by category
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find({}); 
      }
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router


