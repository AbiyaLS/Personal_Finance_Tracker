const User = require('../models/userModels');
const jwt = require("jsonwebtoken");


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --------------------------- REGISTER USER -------------------------------------------
const registerUser = async (req, res) => {
    const { fullName, email, password, profileImage } = req.body;

    // Validation for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create new user (Mongoose will handle password hashing)
        const user = await User.create({
            fullName,
            email,
            password, // Don't hash it manually, let Mongoose handle it
            profileImage,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};
// ---------------------------------- LOGIN USER -----------------------------------------------
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};
//--------------------------------------GET INFORMATION OF USER-------------------------------------
const getUserInfo =async (req,res)=>{
try {
    const user = await User.findById(req.user.id).select("-password");
     
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user);
} catch (err) {
    res.status(500).json({ message: "Invalid User", error: err.message });  
}
}


module.exports = {
    registerUser,
    loginUser,
    getUserInfo
};
