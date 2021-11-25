require('dotenv').config();
const express = require('express');
const router = express.Router();
const CDC = require('../model/cdc.model');

// GET : /getlog
router.get('/getlog', async(req,res)=>{
    try{
        const all_log = await CDC.find({});
        res.status(200).json(all_log);
    }catch(err){
        res.status(500).json({
            message: err.message,
            path: '/api/getlog'
        });
    }
})
// GET : /getlog/:data_id
router.get('/getlog/:data_id', async(req,res)=>{
    try{
        const data_id = req.params.data_id;
        const log = await CDC.find({data_id: data_id});

        res.status(200).json(log);
    }catch(err){
        res.status(500).json({
            message: err.message,
            path: `/api/getlog/${data_id}`
        });
    }
})


// POST : /updatelog



module.exports = router;