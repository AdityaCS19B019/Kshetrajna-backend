const mongoose = require('mongoose')

const schema = mongoose.Schema({
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

module.exports = mongoose.model("workflowstemplate" , schema)