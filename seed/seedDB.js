require("dotenv").config();
const mongoose = require("mongoose")
const CDC = require('../model/cdc.model');
const MONGO_URI =   process.env.MONGO_URI || `mongodb://localhost:27017/test-cdc`

mongoose.connect(MONGO_URI, () =>
	console.log(`[*]Seed Connection established.`)
)
let seedCount = 0;
const updateDatabase = async ()=>{
    try{
        for(let x = 0;x<100;x++){
        let newLog = {
            data_id: 100+x,
            timestamp: Date.now(),
            content: `BINARY DATA ${100+x *99999}`,
            change_log:[] 
        }
        let log = new CDC(newLog);
        try{
            await log.save();
            seedCount++;
         }catch(err){
            console.log(err.message);
         }
     }
    }catch (err) {
		console.log(err)
	}
}
const executeSeeder = async()=>{
    await CDC.deleteMany({});
	await updateDatabase().then(() => {
        console.log(`[*]${seedCount} Seed Data Points added.`);
	    mongoose.connection.close();
        console.log(`[*]Seed Connection Closed.`);
    });
}

executeSeeder();