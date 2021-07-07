const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localization = require('../model/localization');
const Event = require('../model/event');
const User = require('../model/user');
const Rating = require('../model/rating');

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
        const { category, name, email}  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }

        var confirmeds = user.confirmedEvents;
        var eventsIn = [];

        if ((!category && !name)||(category == null && name == null)){
        Event.find( { isLocal: true, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;

                var item = {event: events[i], imIn: false}
                for (let index = 0; index < confirmeds.length; index++) {
                    const element = confirmeds[index];
        
                    if (element == events[i].id){
                        item = {event: events[i], imIn: true}
                    }
                }   
                eventsIn.push(item)
            }
            return res.status(200).json(eventsIn);
        });
        }
        else if ( category == null || !category){
            Event.find( { isLocal: true, "name": {"$regex": name,"$options":"i"}, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else if ( name == null || !name){
            Event.find( { isLocal: true, category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }   
                    
                return res.status(200).json(eventsIn);
                });
        }
        else{
            Event.find( { isLocal: true, "name": {"$regex": name,"$options":"i"}, category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).send(eventsIn);
                });
        }
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});
//Eventos passado presenciais (Para pode ver avaliações)
router.get("/pasteventpresential", async (req,res) => {
    try {
        const { category, name, email}  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }

        var confirmeds = user.confirmedEvents;
        var eventsIn = [];

        if ((!category && !name)||(category == null && name == null)){
        Event.find( { isLocal: true, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;

                var item = {event: events[i], imIn: false}
                for (let index = 0; index < confirmeds.length; index++) {
                    const element = confirmeds[index];
        
                    if (element == events[i].id){
                        item = {event: events[i], imIn: true}
                    }
                }   
                eventsIn.push(item)
            }
            return res.status(200).json(eventsIn);
        });
        }
        else if ( category == null || !category){
            Event.find( { isLocal: true, "name": {"$regex": name,"$options":"i"}, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else if ( name == null || !name){
            Event.find( { isLocal: true, category: category, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }   
                    
                return res.status(200).json(eventsIn);
                });
        }
        else{
            Event.find( { isLocal: true, "name": {"$regex": name,"$options":"i"}, category: category, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).send(eventsIn);
                });
        }
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventonline", async (req,res) => {
    try {
        const { category, name, email}  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }

        var confirmeds = user.confirmedEvents;
        var eventsIn = [];

        if ((!category && !name)||(category == null && name == null)){
            Event.find( { isOnline: true, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;
                
                var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
            }
            return res.status(200).json(eventsIn);
            });
        }
        else if ( category == null || !category){
            Event.find( { isOnline: true, "name": {"$regex": name,"$options":"i"}, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else if ( name == null || !name){
            Event.find( { isOnline: true, category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;
                    
                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else{
            Event.find( { isOnline: true, "name": {"$regex": name,"$options":"i"}, category: category, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;
                    
                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});
//Eventos passado online (Para pode ver avaliações)
router.get("/pasteventonline", async (req,res) => {
    try {
        const { category, name, email}  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }

        var confirmeds = user.confirmedEvents;
        var eventsIn = [];

        if ((!category && !name)||(category == null && name == null)){
            Event.find( { isOnline: true, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
            if (err){
                return res.status(400).send({error: "Fail to load presential events"});
            }
            for (var i = 0; i < events.length; i++){
                var local = await Localization.findById(events[i].localization);
                var user = await User.findById(events[i].promoter);
                events[i].promoter = user;

                events[i].localization = local;
                
                var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
            }
            return res.status(200).json(eventsIn);
            });
        }
        else if ( category == null || !category){
            Event.find( { isOnline: true, "name": {"$regex": name,"$options":"i"}, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;

                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else if ( name == null || !name){
            Event.find( { isOnline: true, category: category, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;
                    
                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
        else{
            Event.find( { isOnline: true, "name": {"$regex": name,"$options":"i"}, category: category, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
                if (err){
                    return res.status(400).send({error: "Fail to load presential events"});
                }
                for (var i = 0; i < events.length; i++){
                    var local = await Localization.findById(events[i].localization);
                    var user = await User.findById(events[i].promoter);
                    events[i].promoter = user;
    
                    events[i].localization = local;
                    
                    var item = {event: events[i], imIn: false}
                    for (let index = 0; index < confirmeds.length; index++) {
                        const element = confirmeds[index];
            
                        if (element == events[i].id){
                            item = {event: events[i], imIn: true}
                        }
                    }   
                    eventsIn.push(item)
                }
                return res.status(200).json(eventsIn);
                });
        }
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.get("/eventcategory", async (req,res) => {
    try {
        const { category }  = req.query;
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

router.get("/myevents", async (req,res) => {
    try {
        const { email }  = req.query;
        const user = await User.findOne({email});
        Event.find( { promoter: user.id, date: { $gte: Date.now() }}, null, {sort: "date"}, async function(err,events){
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

router.get("/mypastevents", async (req,res) => {
    try {
        const { email }  = req.query;
        const user = await User.findOne({email});
        Event.find( { promoter: user.id, date: { $lte: Date.now() }}, null, {sort: "date"}, async function(err,events){
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


router.get("/confirmedevents", async (req,res) => {
    try{
        const { email }  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }
        var myEvents = [];

        var confirmeds = user.confirmedEvents;

        for (let index = 0; index < confirmeds.length; index++) {
            const element = confirmeds[index];
            var event = await Event.findById(element);
            var local = await Localization.findById(event.localization);

            event.promoter = user;
            event.localization = local;

            if (Date.now() < event.date){
                myEvents.push(event);
            } 
        }
        return res.status(200).json(myEvents);

    }catch (err){
        return res.status(404).send({error: err.message});  
    }
});

router.get("/pastevents", async (req,res) => {
    try{
        const { email }  = req.query;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).send({error: "User not found"});
        }
        var myEvents = [];

        var confirmeds = user.confirmedEvents;

        for (let index = 0; index < confirmeds.length; index++) {
            const element = confirmeds[index];
            var event = await Event.findById(element);
            var local = await Localization.findById(event.localization);

            event.promoter = user;
            event.localization = local;
            var rate = false

            if (Date.now() > event.date){
                for (let k = 0; k < event.ratings.length; k++) {
                    const element = await Rating.findById(event.ratings[k]);
                    if (element.user == user.id){
                        rate = true;
                    }
                }
    
                var eventR = {event: event,rated: rate};
                myEvents.push(eventR);
            } 
        }
        return res.status(200).json(myEvents);

    }catch (err){
        return res.status(404).send({error: err.message});  
    }
});

router.get("/rate", async (req, res) => {
    try {
        const { eventID }  = req.query;
        const event = await Event.findById(eventID);

        if (!event){
            return res.status(400).send({error: "Event not found"});
        }
        var ratings = event.ratings;
        var avaliacoes = [];
        var mSec = 0;
        var mQua = 0;
        var mFai = 0;

        for (let i = 0; i < ratings.length; i++) {
            const element = await Rating.findById(ratings[i]);
            mSec += element.security;
            mQua += element.quality;
            mFai += element.faithfulness;
            const user = await User.findById(element.user);
            element.user = user;
            avaliacoes.push(element);
        }
        mSec = mSec/ratings.length;
        mQua = mQua/ratings.length;
        mFai = mFai/ratings.length;

        return res.status(200).send({ratings: avaliacoes, mSecurity: mSec, mQuality: mQua, mFaithfulness: mFai});
        
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

router.post("/confirm", async (req,res) => {
    try {
        const {email, eventID} = req.body;
        const user = await User.findOne({email});
        const event = await Event.findById(eventID);

        if (!user){
            return res.status(404).send({error: "User not found"});
        }
        if (!event){
            return res.status(404).send({error: "Event not found"});
        }

        var confirmeds = user.confirmedEvents

        for (let index = 0; index < confirmeds.length; index++) {
            const element = confirmeds[index];
            if (element == event.id){
                return res.status(400).send({error: "Event already confirmed"})
            }
            
        }
        user.confirmedEvents.push(event);
        event.confirmedUsers.push(user);
        user.save();
        event.save();
        
        return res.status(200).send({user,event});
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.post("/unconfirm", async (req,res) => {
    try {
        const {email, eventID} = req.body;
        const user = await User.findOne({email});
        const event = await Event.findById(eventID);

        if (!user){
            return res.status(400).send({error: "User not found"});
        }
        if (!event){
            return res.status(400).send({error: "Event not found"});
        }

        var confirmeds = user.confirmedEvents
        var check = false
        for (let index = 0; index < confirmeds.length; index++) {
            const element = confirmeds[index];
            if (element == event.id){
                user.confirmedEvents.splice(user.confirmedEvents.indexOf(element), 1);
                check = true;
            }
            
        }
        
        if(check){
            event.confirmedUsers.splice(user.confirmedEvents.indexOf(user), 1);
            event.save();
        }
        user.save();
        
        
        return res.status(200).send({user,event});
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

router.post("/rate", async (req,res) => {
    try {
        const {eventID, rate} = req.body;
        const user = await User.findById(rate.user);
        const event = await Event.findById(eventID);

        if (!user){
            return res.status(404).send({error: "User not found"});
        }
        if (!event){
            return res.status(404).send({error: "Event not found"});
        }

        const rating = await Rating.create(req.body.rate);

        var confirmeds = user.confirmedEvents;
        
        var flag = false

        for (let index = 0; index < confirmeds.length; index++) {
            const element = confirmeds[index];
            if (element == event.id){
                flag = true;
                break;
            }
            
        }
        if (!flag){
            return res.status(400).send({error: "Event not confirmed"})
        }
        for (let i = 0; i < event.ratings.length; i++) {
            const element = await Rating.findById(event.ratings[i]);
            if (element.user == rate.user){
                return res.status(400).send({error: "Event already rated"})
            }
        }
        event.ratings.push(rating);
        event.save();
        
        return res.status(200).send({rating,event});
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
});

module.exports = app => app.use('/', router);
