const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localization = require('../model/localization');
const Event = require('../model/event');

const router = express.Router();

router.get("/event", async (req,res) => {
    try {
        Event.find( {date: { $gte: Date.now() }}, null, {sort: "date"}, function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load events"});
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventpresential", async (req,res) => {
    try {
        Event.find( { isLocal: true, date: { $gte: Date.now() }}, null, {sort: "date"}, function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            return res.status(200).json(events);
        });
        
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventonline", async (req,res) => {
    try {
        Event.find( { isOnline: true, date: { $gte: Date.now() }}, null, {sort: "date"}, function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
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
        Event.find( { category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load events:"+category});
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
        const localization = await Localization.create(place);
        if (!localization){
            return res.status(400).send({error: "Local inválido"})
        }
        var body = req.body
        body.localization = localization
        const event = await Event.create(body);
        

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