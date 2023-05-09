const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const workflow = require('../../models/workflow')
const Forms = require('../../models/form')
const Responses = require('../../models/responses')
const crops = require('../../models/crop')
router.post('/getmyworkflow' , async (req,res) => {
    const cropid = req.body.cropid
    console.log('request sent')
    console.log(req.body)
    if(cropid == null)
    {
        res.status(400).json({
            "success" : "false",
            "error" : "no body in request"
        })
    }
    else
    {
        try{
            const response = await workflow.findOne({"cropid" : mongoose.Types.ObjectId(cropid)})
            const crop = await crops.findOne({_id : cropid})
            // // console.log(response.cropid)
            if(response.curstage != response.stages.length)
            {
                const formid = response.stages[response.curstage].formId
            }
            const date = new Date()
            let day = date.getDate()
            let month = date.getMonth()
            if(month < 10)
                month = '0' + month
            if(day < 10)
                day = '0' + day
            let year = date.getFullYear()
            let totaldate = `${year}-${month}-${day}`
            const resforms = await Responses.find({submitteddate : totaldate})
            if(response.curstage == response.stages.length)
            {
                res.status(200).json({
                    "success" : true,
                    "workflowInstance" : {
                        "workflow" : response,
                    },
                    "img" : crop.img
                })
            }
            else if(resforms.length == 0)
            {
                try{
                    const form = await Forms.findOne({"_id" : mongoose.Types.ObjectId(formid)})
                    res.status(200).json({
                        "success" : true,
                        "workflowInstance" : {
                            "workflow" : response,
                            "form" : form,
                            "submitted" : false,
                        },
                        "img" : crop.img
                    })
                }catch(e){

                }
            }
            else
            {
                res.status(200).json({
                    "success" : true,
                    "workflowInstance" : {
                        "workflow" : response,
                        "submitted" : true
                    },
                    "img" : crop.img
                })
            }
            
        }catch(e){
            console.log(e)
            res.status(400).json({
                "success" : "false",
                "error" : "failed in fetching data"
            })
        }
    }
})

router.post('/getform' , async (req,res) => {
    const formid = req.body.formId
    const form = await Forms.findOne({"_id" : mongoose.Types.ObjectId(formid)})
    res.status(200)
})

router.put('/submitresponses' , async(req,res) => {
    const responses = req.body.responses
    const cropid = req.body.cropid
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    if(month < 10)
        month = '0' + month
    if(day < 10)
        day = '0' + day
    let year = date.getFullYear()
    let totaldate = `${year}-${month}-${day}`
    try{
        const resp = new Responses({
            responses : responses,
            cropid : mongoose.Types.ObjectId(cropid),
            submitteddate : totaldate
        })
        resp.save()
        res.status(201).json({
            "success" : true
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            "success" : false
        })
    }
})

module.exports = router