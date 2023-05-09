const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const mandi = require('../../models/mandi_entry')

router.post('/' , async (req,res) => {
    const response = await mandi.find()
    res.status(200).json({
        products : response,
        success : true
    })
})

router.put('/pitchprice' , async(req,res)=>{
    const cropid = req.body.cropid
    const newprice = req.body.newprice
    if(cropid == null)
    {
        res.status(400).json({
            error : "missed parameters",
            success : true
        })
    }
    else
    {
        try{
            const resp = mandi.findOneAndUpdate(
                {
                    cropid : mongoose.Types.ObjectId(cropid)
                },
                {
                    highprice : newprice
                },
                {
                    new : true
                }
            )
            res.status(201).json({
                "success": true
            })
        }catch(e){
            res.status(201).json({
                "success": false,
                "error" : "failed updating"
            })
        }
    }
})

module.exports = router