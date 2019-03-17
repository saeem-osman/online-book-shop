"use restrict"


const express = require('express');
const app = express();
const path = require('path');

//middleware to define folder for static files
app.use(express.static('public')); 

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('App is listening on port '+ PORT));
