require("dotenv").config();
const fs = require('fs');
const zlib = require('zlib');
const express = require("express");
const router = express.Router();
const CDC = require("../model/cdc.model");
const ChangeLog = require("../model/changeLog.model");

// GET : /getlog
router.get("/getlog", async (req, res) => {
    try {
        const all_log = await CDC.find({});
        res.status(200).json(all_log);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
            result: `server error`,
        });
    }
});
// GET : /getlog/:data_id
router.get("/getlog/:data_id", async (req, res) => {
    try {
        const data_id = req.params.data_id;
        
        if(isNaN(data_id)){
            return res.status(400).json({
                status: 400,
                message: `${data_id} is not valid data_id.`,
                result: 'error'
            });
        }

        const log = await CDC.findOne({ data_id: data_id });
        if(log!==null){
            res.status(200).json({
                status: 200,
                message: `Log for ${data_id}`,
                result: log
            });
        }else{
            res.status(404).json({
                status: 404,
                message: `No Log Found`,
                result: {}
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
            result: `server error`,
        });
    }
});

// GET : /getcapturehistory/:data_id
router.get("/getcapturehistory/:data_id", async(req,res) => {
    const data_id = req.params.data_id;

    try{
        const log = await CDC.findOne({ data_id: data_id }).populate('change_log');        
        if(log !== null){
            res.status(200).json({
                status: 200,
                message: "success",            
                result: log
            })
        }else{
            res.status(400).json({
                status: 400,
                message: `No Capture log found.`,
                result: {}
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
            result: {}            
        });
    }
})

// POST : /createlog
router.post("/createlog", async (req, res) => {
    const new_id = req.body.id;
    const newcontent = req.body.content;
    // check
    const datalog = await CDC.findOne({ data_id: new_id });
    if (datalog) {
        const newChangeLog = await ChangeLog.findOne({ cdcId: datalog._id })

        const changeLog = {
            version: new_id + (newChangeLog.change_log.length + 1),
            content: datalog.content,
        };

        newChangeLog.change_log.push(changeLog);

        const newData = newChangeLog.change_log.toString();

        //writing logs to file
        fs.writeFile('./input.txt',newData,(err)=>{
            if(err){
                return console.log(err);
            }
        })

        //compressing the file
        const gzip = zlib.createGzip();
        const r = fs.createReadStream('./input.txt');
        const w = fs.createWriteStream('./output.txt.gz');
        r.pipe(gzip).pipe(w);

        //pushing the content to database
        datalog.content = newcontent;
        datalog
            .save()
            .then(result => {
                return newChangeLog.save();
            })
            .then((result) => {
                res.status(200).json({
                    message: "[*]Data History Captured",
                    result: "success",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                    result: "error",
                });
            });
    } else {
        let cdc_Id,changeLog_Id;
        const newLog = new CDC({
            data_id: new_id,
            timestamp: Date.now(),
            content: newcontent,
        });
        newLog
            .save()
            .then((result) => {
              const newChangeLog = new ChangeLog({
                cdcId: result._id,                
              })

              cdc_Id = result._id;

              return newChangeLog.save();
            })
            .then(result => {
                changeLog_Id = result._id;
                return CDC.findById(cdc_Id);
            })
            .then(result => {
                result.change_log = changeLog_Id;
                result.save();
            })
            .then((result) => {
                res.status(200).json({
                    message: "Log created successfully",
                    result: "success",                    
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                    result: "error",
                });
            });
    }
});

module.exports = router;
