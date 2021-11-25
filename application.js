require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const connectDB = require('./config/connection');
const CDC = require('./model/cdc.model');
connectDB();

/*
Custom API to record data changes and write to changelog DB.
Something similar to Version Control needs to be implemented.
*/
// Middlewares
const logRoutes = require('./routes/log.route');
app.use(express.json());
app.use(cors());
app.use('/api', logRoutes);



app.get('/', (req,res)=>{
    let display_message = `</br></br><center><h1>Welcome To H2H-DASP Server!</h1>
                            <h3>Team Members</h3>
                            <ul type='none'>
                            <li>Akash Chouhan 1905156</li>
                            <li>Akriti Anand 1905157</li>
                            <li>Surya Thangirala 1905245</li>
                            <li>Himanshu Verma 1905900</li>
                            <li>Kanishk Gupta 1905902</li>
                            </ul>
                         </center>`;
    res.status(200).send(display_message);
});

app.listen(PORT, ()=>{
    const serverLog = {
        status: 'live',
        port: PORT,
        base_url: `http://localhost:${PORT}`
    }
    console.table(serverLog);
});
