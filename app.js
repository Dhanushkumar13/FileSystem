const express = require('express');
const { error } = require('node:console');
const app = express()
const fs = require("node:fs/promises");
const { urlToHttpOptions } = require('node:url');
const path = require('path');
const folderPath = './files';

app.get('/',(request,response,next)=>{
    console.log('I am get request')
    return response.status(200).json({
        Message: "Response Successful!",
    });
});

//TO GET ALL THE FILE SYSTEMS PRESENT IN A PARTICULAR FILE USING READDIR
//ENDPOINT: http://localhost:5000/api/view

app.get('/view',(request,response,next)=>{
    fs.readdir(folderPath, (error, files)=>{
        if(error){
            return response.status(400).json({
                Message: "Error Occured!",
                result: error
            })
        }else{
            const textfile = files.filter((file)=> path.extname(file).toLowerCase === '.txt')
            response.json({textfile})
        }
    })
})




//TO CREATE FILE SYSTEM 
// ENDPOINT: http://localhost:5000/api/createFile
app.get("/createFile", async (request,response,next)=>{
    const fileName = `${new Date().getDate()}  ${new Date().getMonth()}- Time(${new Date().getHours()}-${new Date().getMinutes()})`;
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