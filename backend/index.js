require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(express.json());

// Improved CORS setup
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allow frontend requests
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Handle preflight requests
app.options("*", cors());

// Connect to database
connectDB();

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root route for testing server status
app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
