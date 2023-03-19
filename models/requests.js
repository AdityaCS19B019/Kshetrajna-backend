const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    sender : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    receiver :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    connectiontype: {
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    }
})

module.exports = mongoose.model('Requests' , Schema)