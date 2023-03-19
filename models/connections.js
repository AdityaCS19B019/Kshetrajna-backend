const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    user1:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    connectiontype:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model('Connections' , Schema)