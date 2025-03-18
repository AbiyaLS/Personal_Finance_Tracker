const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protect = async (req, res, next) => {
    let token;

    // Check if the token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user data to request, excluding password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = { protect };
