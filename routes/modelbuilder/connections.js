const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Consultant = require('../../models/consultant')
const Requests = require('../../models/requests')
router.get('/' , async (req,res) => {
    let consultants = await Consultant.find()
    console.log('Ji')
    // res.send(consultants)
    res.render('modelbuilderconnect' , {consultants:consultants})
})

router.get('/connect/:id' , async (req,res) => {
    // const {sender, receiver} = req.params;
    const sender = 'Charan'
    let request = new Requests({
        // sender: req.body.sender,
        // reciever: req.params.reciever
        sender: sender,
        receiver: req.params.id,
        connectiontype:8,
    })

    try{
        let req = await request.save()
        console.log('saved')
        res.send({req:req,message:"True"})
        // res.redirect('/connections')
    }catch(e)
    {
        console.log(e)
        res.send({req:{},message:"False"})
    }
    // res.send('Sender ' + req.params.sender + ' , Reciever : ' + req.params.reciever)
})

module.exports = router