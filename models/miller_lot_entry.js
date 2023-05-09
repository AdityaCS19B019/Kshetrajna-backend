const mongoose = require('mongoose')

const schema = mongoose.Schema({
    cropid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    lotid : {
        type : String,
        required : true
    },
    millerid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    millno : {
        type : mongoose.Schema.Types.Number,
        default : 1
    },
    Amount : {
        type : Number,
        required : true
    },
    purchaseddate : {
        type : Date,
        deafult : Date.now()
    }
})

module.exports = mongoose.model("miller_lot_entry" , schema)