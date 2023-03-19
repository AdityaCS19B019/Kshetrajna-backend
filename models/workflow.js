const mongoose = require('mongoose')

const schema = mongoose.Schema({
    cropid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    workflowname : {
        type: String,
        required : true
    },
    curstage : {
        type : Number,
        default : 0
    },
    createddate : {
        type : Date,
        default : Date.now()
    },
    stages : {
        type: mongoose.Schema.Types.Array,
        required : true
    },
})

module.exports = mongoose.model('workflows' , schema)