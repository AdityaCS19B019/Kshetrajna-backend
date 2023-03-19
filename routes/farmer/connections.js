const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Consultant = require('../../models/consultant')
const Requests = require('../../models/requests')
router.get('/' , async (req,res) => {
    try{
        let consultants = await Consultant.find()
        res.status(200).json({
            consultants : consultants,
            success: "true"
        })
    }catch(e){
        console.log(e)
        res.status(300).json({
            success:"false"
        })
    }
    // console.log('Ji')
    // res.render('farmerconnect' , {consultants:consultants});  
})

router.post('/connect' , async (req,res) => {

    var sender = req.body.sender
    var receiver =  req.body.receiver
    var connectiontype= 1
    if(sender == null || receiver == null)
    {
        res.status(400).json({
            error : "expeceted request body"
        })
    }
    else
    {
        let request = new Requests({
            sender : sender,
            receiver : receiver,
            connectiontype : connectiontype
        })
    
        try{
            let req = await request.save()
            // console.log('connection sent')
            res.status(201).json({
                data: req,
                success:"true"
            })
            // res.redirect('/connections')
        }catch(e)
        {
            console.log(e)
            res.status(400).json({
                error : "failed inserting"
            })
        }
    }
    // res.send('Sender ' + req.params.sender + ' , Reciever : ' + req.params.reciever)
})

module.exports = router