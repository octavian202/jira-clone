import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
app.use(express.json())

const PORT = 8000;

const uri = process.env.MONGODB_URI

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function startApp() {
    try {
        console.log("trying mongodb atlas connection")
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("successfully pinged. connected to db")

        app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)})
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startApp()