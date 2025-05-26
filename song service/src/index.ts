import express from 'express'
import dotenv from 'dotenv'
import songRoutes from './route.js'
const app = express();

dotenv.config();

app.use('/api/v1', songRoutes)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})