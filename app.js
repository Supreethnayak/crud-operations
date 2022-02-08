import express from 'express'; 
const app = express();
import {join} from 'path'
import web from './routes/web.js'
const port  = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"

import connectDB from './db/connectdb.js'

// Database Connection
connectDB(DATABASE_URL)

// Set middelware to use req.body
app.use(express.urlencoded({extended:false}))

// Static Files -> Middleware
app.use('/student',express.static(join(process.cwd(), "public")))
app.use('/student/edit',express.static(join(process.cwd(), "public")))

// Set Template Engine
app.set("view engine", "ejs")

// Load Routes
app.use("/student", web)

app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);;
})