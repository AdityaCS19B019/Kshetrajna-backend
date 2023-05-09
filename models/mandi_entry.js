const mongoose = require('mongoose')

const schema = mongoose.Schema({
    cropid : {
        type : mongoose.Schema.Types.ObjectId,
        requried : true
    },
    farmerid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    cropname : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    pitchedprice : {
        type : Number,
        default : 0
    },
    highprice : {
        type : Number,
        deafult : 0
    }
})

module.exports = mongoose.model('mandi_entry' , schema)