const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const mandi = require('../../models/mandi_entry')

router.get('/' , async (req,res) => {
    const response = await mandi.find()
    res.status(200).json({
        data : response,
        success : true
    })
})

router.put('/pitchprice' , async(req,res)=>{
    const cropid = req.body.cropid
    if(cropid == null)
    {
        res.status(400).json({
            error : "missed parameters",
            success : true
        })
    }
    else
    {
        let res 
    }
})

module.exports = router