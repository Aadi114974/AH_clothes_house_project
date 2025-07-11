import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working fine")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))
