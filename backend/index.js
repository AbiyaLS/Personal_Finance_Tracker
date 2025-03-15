require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const authRoutes =require('./routes/authRoutes')


const app = express();

// Middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"], // Fixed typo
    })
);
app.use(express.json());

// Connect to database
connectDB();
app.use("/api/v1/auth",authRoutes);
const PORT = process.env.PORT || 5002;

// Router (Uncomment if you have routes)
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

app.listen(PORT, () => console.log(`Server connected successfully on port ${PORT}`));
