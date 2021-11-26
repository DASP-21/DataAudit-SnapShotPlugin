require("dotenv").config();
const { text } = require("express");
const express = require("express");
const router = express.Router();
const CDC = require("../model/cdc.model");

// GET : /getlog
router.get("/getlog", async (req, res) => {
  try {
    const all_log = await CDC.find({});
    res.status(200).json(all_log);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      path: "/api/getlog",
    });
  }
});
// GET : /getlog/:data_id
router.get("/getlog/:data_id", async (req, res) => {
  try {
    const data_id = req.params.data_id;
    const log = await CDC.find({ data_id: data_id });

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      path: `/api/getlog/${data_id}`,
    });
  }
});


// POST : /createlog
router.post("/createlog", async (req, res) => {
  const new_id = req.body.id;
  const newcontent = req.body.content;

  const datalog = await CDC.findOne({ data_id: new_id });
  // If the log is no longer valid, we forbid any data capture requests. [Temporary Feature]
  if(datalog){
    if(!datalog.is_active){
      res.status(403).json({
        message: `[*]Datalog for ${datalog.data_id} is no longer active.`,
        result: `data capture is forbidden for this log.`
      });
    }
    else if(datalog.is_active){
    
      const changeLog = {
        version: new_id + (datalog.change_log.length + 1),
        content: datalog.content,
      };
      datalog.change_log.push(changeLog);
      datalog.content = newcontent;
      datalog
      .save()
      .then((result) => {
        res.status(200).json({
          message: "[*]Data History Captured",
          result: "success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          result: "error",
        });
      });
  }
}else { //DataLog deos not exist, need to create a new document.
    const newLog = new CDC({
      data_id: new_id,
      timestamp: Date.now(),
      content: newcontent,
    });
    newLog
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Log created successfully",
          result: "success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          result: "error",
        });
      });
  }
});
// Invalid Route:
router.get('/*', (req,res)=>{
  res.status(400).json({
    message: `Invalid Get Request`,
    result: `error`
  });
})
/****************************************************************************************************************/ 
/* Temporary Feature for our DASP Service */ 
// Disable Data Capture for a specific data_id
// router.get('/preventlog/:data_id', async(req,res)=>{
//   const data_id = req.params.data_id;
//   const log = await CDC.find({ data_id: data_id })
//   if(log){
//     log.is_active = !log.is_active;
//     log
//    .save()
//    .then((result) => {
//         res.status(200).json({
//           message: `[*]Datalog #${datalog.data_id} has been disabled.`,
//           result: "success",
//         });
//       })
//     .catch((err) => {
//         res.status(500).json({
//           message: err.message,
//           result: "error",
//         });
//     });
//   }else{
//     // Invalid Data_id
//     res.status(400).json({
//       message: `[*]Datalog #${datalog.data_id} does not exist.`,
//       result: "failure",
//     })
//    }
//   
// })

module.exports = router;
