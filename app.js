const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    age : String,
    gender : String,
    number : String,
    email : String,
    address : String,
    desc : String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myDate = new Contact(req.body);
    myDate.save().then(()=>{
        res.send("The Data has been saved to DataBase")
    }).catch(()=>{
        res.status(400).send("<h1>Error 404 | Item not Found</h1>")
    });

    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{ 
    console.log(`The application started successfully on port ${port}`);
});