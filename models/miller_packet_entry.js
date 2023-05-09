const mongoose = require('mongoose')

const schema = mongoose.Schema({
    lotid : {
        type : String,
        required : true
    },
    milerid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    millno : {
        type : Number,
        default : 1
    },
    Packetno : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('miller_packet_entry' , schema)