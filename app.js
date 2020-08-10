const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const studentRoutes = require("./api/routes/StudentRoutes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*', );
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,' +
        ' Content-Type, Accept,' +
        ' Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/student', studentRoutes);

app.use((req, res, next) => {
    res.status(404).send({url: req.originalUrl + ' not found!'});
});

app.use((error, req, res, next) => {
    if(res.headersSent)
    {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred'});
});


const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fc9by.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

//const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-usg5d.mongodb.net`+
//     `/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect( url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() =>{
        app.listen( process.env.PORT ||3000);
    })
    .catch(err => console.log( err ));

mongoose.connection.on('connected',()=>{
    console.log("mongoose is connected");
});



