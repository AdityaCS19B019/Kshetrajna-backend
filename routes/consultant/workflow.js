const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const workflowstemplate = require('../../models/workflowstemplate')
const Form = require('../../models/form')
const workflow = require('../../models/workflow')
const crop = require('../../models/crop')
const Responses = require('../../models/responses')

router.post('/getworkflows' , async(req,res) => {
    console.log('request reciebed')
    const response = await workflowstemplate.find()
    res.status(200).send(response)
})

router.post('/responses' , async(req,res) => {
    const cropid = req.body.cropid
    console.log('recieved request for worklfow responses')
    if(cropid == null)
    {
        res.status(400).json({
            "success" : "false",
            "error" : "missed parameters"
        })
    }
    else
    {
        try{
            // const date = new Date()
            // let day = date.getDate()
            // let month = date.getMonth()
            // if(month < 10)
            //     month = '0' + month
            // if(day < 10)
            //     day = '0' + day
            // let year = date.getFullYear()
            // let totaldate = `${year}-${month}-${day}`
            const responses = await Responses.find({cropid : mongoose.Types.ObjectId(cropid)})
            res.status(200).json({
                "success" : "true",
                "forms" : responses
            })
        }catch(e){
            res.status(400).json({
                "success" : "false",
                "error" : e
            })
        }
    }
})

router.put('/addworkflowtemplate' , async(req,res) => {
    // const cropid = mongoose.Types.ObjectId(req.body.cropid)
    const workflowname = req.body.workflowname
    const curstage = req.body.curstage
    const stages = req.body.stages

    const workflowinstance = new workflowstemplate({
        // cropid : cropid,
        workflowname : workflowname,
        curstage : curstage,
        stages : stages
    })
    try{
        const w = await workflowinstance.save()
        res.status(201).json({
            "success" : "true",
            "id" : w._id
        })
    }catch(e){
        req.status(400).send(e)
    }
})

router.put('/assignworkflow' , async(req,res)=>{
    const cropid_raw = req.body.cropid
    const workflowid = req.body.workflowid
    if(cropid_raw == null || workflowid == null)
    {
        res.status(400).json({
            "status" : "false",
            "error" : "missed request body"
        })
    }
    else
    {
        try{
            const template = await workflowstemplate.findOne({_id : mongoose.Types.ObjectId(workflowid)})
            const curstage = template.curstage
            const stages = template.stages
            const workflowname = template.workflowname
            const response = new workflow({
                curstage : curstage,
                cropid : mongoose.Types.ObjectId(cropid_raw),
                stages : stages,
                workflowname : workflowname
            })
            try{
                const r = await response.save()
                const c = await crop.findByIdAndUpdate(
                        {
                            _id : mongoose.Types.ObjectId(cropid_raw)
                        },
                        {
                            workflowassigned : true
                        },
                        {
                            new : true
                        }
                )
                console.log('assigned')
                res.status(201).json({
                    "success" : "true"
                })
            }catch(e){
                res.status(400).json({
                    "success" : "false",
                    "error" : e
                })
            }
        }catch(e){
            res.status(400).json({
                "success" : "false",
                "error" : e
            })
        }
    }
})

router.put('/addform' , async (req,res) => {
    const questions = req.body.questions
    const forminstance =  new Form({
        questions : questions
    })
    try{
        const f = await forminstance.save()
        res.status(201).json({
            "success" : "true",
            "formid" : f._id
        })
    }catch(e){
        res.status(400).json({
            "success" : "false",
            "error" : e
        })
    }
})

router.post('/changestage' , async(req,res)=>{
    const cropid = req.body.cropid
    const newstage = req.body.newstage
    if(cropid == null || newstage == null)
    {
        res.status(400).json({
            "success" : "false",
            "error" : "missed req body"
        })
    }
    else
    {
        try{
            const response = await workflow.findOneAndUpdate(
                {
                    cropid : mongoose.Types.ObjectId(cropid)
                },
                {
                    curstage : newstage
                },
                {
                    new : true
                }
            )
            res.status(201).json({
                "success" : "true"
            })
        }catch(e){
            res.status(400).json({
                "success" : "false",
                "error" : e
            })
        }
    }
})

module.exports = router