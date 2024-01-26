const router = require('express').Router()
const Cart = require('../models/Cart')
const {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenAndAuthorization
}=require('../middleware/authorization')

// Routes

//-CREATE

router.post('/api/carts',verifyToken , async(req,res) =>{
    try{
        const userId = req.user.id
        const body = req.body
        const createdCart = {
            ...body,
            userId
        }
         const cart = await new Cart(createdCart)
        await cart.save()
        res.status(201).send(cart)
    }catch(e){
        res.status(500).send(e)
    }

} )

//-UPDATE
router.put("/api/carts/:id",verifyTokenAndAuthorization , async (req, res) => {
    
    const updates = Object.keys(req.body)
    allowedUpdates = ['products']
    isAllowed = updates.every((update) => allowedUpdates.includes(update))

    if(!isAllowed){
        return res.status(400).send('Something goes wrong, check parameters')
    }
    
    try {
      const updatedCart = await Cart.findOneAndUpdate({
          userId:req.params.id
        },
        {
          $set: req.body,
        },
        { new: true }
      );

      if(!updatedCart){
          return res.status(404).send('Cart not found')
      }
      res.status(200).send(updatedCart);
    } catch (err) {
       res.status(500).send(err);
    }
  });

//-DELETE
router.delete('/api/carts/:id',verifyTokenAndAuthorization, async(req,res) =>{
    try{
        cart = await Cart.findOneAndDelete({userId:req.params.id})
        if(!cart) return res.status(404).send('cart not found')
        res.send(cart)
    }catch(e){
        res.status(500).send(e)
    }
})

//-GET USER CART

router.get('/api/carts/:id',verifyTokenAndAuthorization, async(req,res) =>{
    try{
        cart = await Cart.findOne({userId:req.params.id})
        if(!cart) return res.status(404).send('cart not found')
        res.send(cart)
    }catch(e){
        res.status(500).send(e)
    }
})

//-GET ALL

router.get("/api/carts/", verifyTokenAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).send(carts);
    } catch (err) {
      res.status(500).send(err);
    }
  });


module.exports = router