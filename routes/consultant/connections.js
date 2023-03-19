const express = require('express')
const Requests = require('../../models/requests')
const connection = require('../../models/connections')
const { findOneAndUpdate } = require('../../models/consultant')
const { default: mongoose } = require('mongoose')
const router = express.Router()

router.get('/requests' , async (req , res) => {
    // let reciever = req.body.reciever
    try{
        let requests = await Requests.find({reciever : reciever})
        res.status(200).json({req:requests,message:"True"})
    }catch(e)
    {
        console.log("error")
        res.send(requests)
    }
})

router.post('/acceptrequest' , async(req,res)=>{
    if(req.body.myid == null || req.body.requesterid == null || req.body.connectiontype == null)
    {
        res.status(400).json({
            "error" : "missed parameters"
        })
    }
    else
    {
        let receiver = mongoose.Types.ObjectId(req.body.myid)
        let sender = mongoose.Types.ObjectId(req.body.requesterid)
        let connectiontype = req.body.connectiontype
        let secondconnectiontype
        let con1 = new connection({
            user1 : receiver,
            user2 : sender,
            connectiontype : connectiontype,
        })
        if(connectiontype === 1)
            secondconnectiontype = 3
        else if(connectiontype === 7)
            secondconnectiontype = 4
        else if(connectiontype === 8)
            secondconnectiontype = 5
        let con2 = new connection({
            user1 : sender,
            user2 : receiver,
            connectiontype : secondconnectiontype
        })
        try{
            let newcon = await con1.save()
            let newcon2 = await con2.save()
            let oldreq = await Requests.findOneAndUpdate({
                                                            reciever : receiver ,
                                                            sender : sender
                                                        } , 
                                                        { 
                                                            status : "accepted",
                                                        },
                                                        {
                                                            new : true,
                                                        })
            res.status(200).json({success:"true"})
        }catch(e){
            console.log(e)
            res.status(400).json({success:"false",error:"failed inserting"})
        }
    }
})

router.post('/modelbuilderrequests' , async(req,res) => {
    let reciever = req.body.reciever
    let requests = await modelbuilderrequests.find({reciever : reciever})
    res.send(requests)
})


module.exports = router