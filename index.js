const express = require('express');
const HTTPServer = express();
const app = require('./app');

const PORT = 5000;
HTTPServer.use('/api',app)

HTTPServer.listen(PORT,"localhost",(request,response,next)=>{
    console.log('Server Started')
});

