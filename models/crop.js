const mongoose = require('mongoose')

const schema = mongoose.Schema({
    cropname : {
        type : String,
        required : true,
    },
    startdate : {
        type : String,
        default : true,
    },
    cropseason : {
        type : String,
        required : true,
    },
    farmerid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    farmername : {
        type : String,
        required : false,
    },
    consultantid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    img : {
        type : String,
        required : false
    },
    soil : {
        type : String,
        required : true
    },
    workflowassigned : {
        type : mongoose.Schema.Types.Boolean,
        default : false
    }
})

module.exports = mongoose.model("crops" , schema)