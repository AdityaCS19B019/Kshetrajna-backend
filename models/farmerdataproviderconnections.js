const mongoose = require('mongoose')

const schema = mongoose.Schema({
    senderid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    recieverid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("farmerdataproviderconnections" , schema)