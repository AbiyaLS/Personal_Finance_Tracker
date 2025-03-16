const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    source : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    type : {
        type : String,
        default : "income"
    },
    date : {
        type : Date,
      default:Date.now
    }
},{timestamps : true})

module.exports =mongoose.model('Income',IncomeSchema)