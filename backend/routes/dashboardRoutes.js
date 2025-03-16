const express =require("express")
const { getDashboardData } = require('../controller/dashboard')
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

//Get the data from the db
router.get('/get-dashboard',protect,getDashboardData)

module.exports= router