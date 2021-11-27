require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const connectDB = require('./config/connection');
const CDC = require('./model/cdc.model');
connectDB();

/*
Custom API to record data changes and write to changelog DB.
*/

// Static Files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const logRoutes = require('./routes/log.route');
app.use('/api', logRoutes);



app.get('/', (req,res)=>{
    res.status(200).render('home');
});

app.listen(PORT, ()=>{
    const serverLog = {
        status: 'live',
        port: PORT,
        base_url: `http://localhost:${PORT}`
    }
    console.table(serverLog);
});
