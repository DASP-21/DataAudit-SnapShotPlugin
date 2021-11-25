require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const connectDB = require('./config/connection');
connectDB();
const CDC = require('./model/cdc.model');

/*
Custom API to record data changes and write to changelog DB.
Something similar to Version Control needs to be implemented.
*/ 


app.get('/', (req,res)=>{
    res.status(200).send('Server is Active');
});

app.listen(PORT, ()=>{
    const serverLog = {
        status: 'live',
        port: PORT,
        base_url: `http://localhost:${PORT}`
    }
    console.table(serverLog);
});
