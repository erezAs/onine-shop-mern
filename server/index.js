// Requires
const express = require('express')
const cors = require("cors");
require('./db/mongoose')

// importing routes
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const authRouter = require('./routes/authenticate')

// Initial express server
const app = express()
const port = process.env.PORT || process.env.ENV_PORT

// Server dependencies & definitions
app.use(cors())
app.use(express.json())

//assign routes
app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)
app.use(cartRouter)
app.use(authRouter)

// Run express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

