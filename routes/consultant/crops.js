const express = require('express')
const mongoose  = require('mongoose')

const router = express.Router()
const Crops = require('../../models/crop')
const Workflows = require('../../models/workflow')
router.post('/mycrops' , async(req,res) => {
    const consultantid = req.body.consultantid

    try{
        const response = await Crops.find({consultantid : mongoose.Types.ObjectId(consultantid) , workflowassigned : false})
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.status(400).json({
            "success" : "false"
        })
    }
})

router.post('/myassignedcrops' , async(req,res) => {
    const consultantid = req.body.consultantid
    // console.log(re)
    console.log('requrest recieved')
    try{
        const response = await Crops.find({consultantid : mongoose.Types.ObjectId(consultantid) , workflowassigned : true})
        // console.log(response)
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.status(400).json({
            "success" : "false"
        })
    }
})

module.exports = router