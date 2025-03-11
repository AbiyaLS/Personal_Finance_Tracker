const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } =require('fs');
const { route } = require("./routes/transactions");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000; 

//middlewares
app.use(express.json())
app.use(cors())

//router    
readdirSync('./routes').map((route)=> app.use('/api/v1',require('./routes/' + route)))

const server =() =>{
    db()
    app.listen(PORT, () => {
    console.log(`Server connected successfully on port`);
})
}
server()