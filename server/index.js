const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/posts')
const port = process.env.PORT || 5000

const app = express()
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/project_first', {
            //useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //userFindAndModify: false,
        })
        console.log('connect mongodb thanh cong')
    } catch (error) {
        console.log('loi connect mongodb',error)
        process.exit(1)
    }
}
connectDB()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)


app.listen(port, ()=> console.log(`sever listening on port ${port}`))
