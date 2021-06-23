const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localization = require('../model/localization');
const Event = require('../model/event');
const User = require('../model/user');

const router = express.Router();

router.get("/event", async (req,res) => {
    try {
        Event.find( {date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;
                events[i].localization = local;
                
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventpresential", async (req,res) => {
    try {
        Event.find( { isLocal: true, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;
                
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventonline", async (req,res) => {
    try {
        Event.find( { isOnline: true, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;
                
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventcategory", async (req,res) => {
    try {
        const { category }  = req.body;
        Event.find( { category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load events:"+category});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;
                
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.use(authMiddleware);

router.get("/", async (req, res) => {
    res.send({ok: true, user: req.email});
});

router.post("/event", async (req,res) => {
    try {
        const place = req.body.localization
        var localization = null;
        var body = req.body
        if (!place && body.isLocal){
            return res.status(400).send({error: "Invalid localization for presential event"})
        }
        else if (!place){
            localization = null;
        }
        else{
            localization = await Localization.create(place);
        }
        
        body.localization = localization
        var event = await Event.create(body);
        event.localization = await Localization.findById(event.localization);

        return res.status(201).send({event});

    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.post("/localization", async (req,res) => {
    try {
        const localization = await Localization.create(req.body);
        
        return res.status(201).send({localization});
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});


module.exports = app => app.use('/', router);