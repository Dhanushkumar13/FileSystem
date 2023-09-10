const express = require('express');
const app = express()
const fs = require("node:fs/promises");
const { urlToHttpOptions } = require('node:url');

app.get('/',(request,response,next)=>{
    console.log('I am get request')
    return response.status(200).json({
        Message: "Response Successful!",
    });
});

app.get("/createFile", async (request,response,next)=>{
    const fileName = `${new Date().getDate()}-Time(${new Date().getHours()}-${new Date().getMinutes()})`;
    try {
         await fs.appendFile(`files/${fileName}.txt`,`${new Date()}`); 
         return response.status(200).json({
            Message: "File Created Successfully!",
        })
    } catch (error) {
        return response.status(400).json({
            Message: "File Not Created!",
        })
    }
});


module.exports = app;