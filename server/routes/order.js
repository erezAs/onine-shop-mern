const router = require('express').Router()
const Order = require('../models/Order')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin
} = require('../middleware/authorization')

// Routes

//Create order
router.post('/api/orders',verifyToken , async (req,res) =>{
    const userId = req.user.id
    const incomingOrder = req.body
    const orderId = Math.random().toString(36).substring(2,10)
    const createdOrder = {
        ...incomingOrder,
        userId,
        orderId
    }
    
    const order = new Order(createdOrder)
    try{
        await order.save()
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
})

// Update Order
router.put('/api/orders/:id',verifyTokenAdmin ,async(req,res) =>{
    const orderId = req.params.id
    const incomingUpdates = req.body
    const allowedUpdates = ['address','status']
    const updates = Object.keys(incomingUpdates)

    isAllowed = updates.every( (update) => allowedUpdates.includes(update))
    if(!isAllowed){
        return res.status(400).send('Something goes wrong , check parameters.')
    }

    try{
        order = await Order.findById(orderId)
        if(!order){
            return res.status(404).send('Order not founded')
        }
        updates.forEach( (update) => order[update] = incomingUpdates[update])
        updatedOrder = await order.save()

        res.send(updatedOrder)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

})

// Delete 
router.delete('/api/orders/:id', verifyTokenAdmin, async(req,res) =>{

    const orderId = req.params.id
    try{
        const order = await Order.findByIdAndDelete(orderId)
        if(!order){
            return res.status(500).send('Order not found.')
        }
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
})

// Get user orders
router.get('/api/orders/:id', verifyTokenAndAuthorization, async(req,res) =>{
    const userId = req.params.id || req.user.id
    try{
        const userOrders = await Order.find({userId:userId})
        if(userOrders.length == 0){
            return res.status(404).send('Orders not found.')
        }

        res.send(userOrders)
    }catch(e){
        res.status(e).send(e)
    }

})

//Get all orders
router.get('/api/orders/', verifyTokenAdmin, async(req,res) =>{

    try{
        orders = await Order.find({})
        if(orders.length == 0){
            return res.status(404).send('Orders not found')
        }

        res.send(orders)
    }catch(e){
        res.status(500).send(e)
    }
})

// GET MONTHLY INCOME

router.get("/api/orders/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).send(income);
    } catch (err) {
      res.status(500).send(err);
    }
  });



module.exports = router