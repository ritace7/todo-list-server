require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); 
const taskRoutes = require('./routes/mainrouter');
const userRoutes = require('./routes/user');

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use(express.static('build'));
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT,()=>{
            console.log('connected to the db & server listening...');
        })
    })
    .catch((error) => {
        console.log(error)
})