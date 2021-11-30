const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));







app.use(express.static(path.join(__dirname, 'pages')));

app.listen(PORT, () =>{
    console.log(`server listening on port: ${PORT}`);
});