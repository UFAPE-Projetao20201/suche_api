const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localization = require('../model/localization');
const Event = require('../model/event');

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
    res.send({ok: true, user: req.email});
});

router.post("/event", async (req,res) => {
    try {
        const event = await Event.create(req.body);
        

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