const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app =  express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const posts = require('../routes/api/posts')

app.listen(port)

app.use((req,res,next) => {
    console.log(" -- NEW REQUEST MADE -- ");
    next();
})

app.use('/api/posts'  , posts)