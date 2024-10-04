
const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')

const app = express();
app.set('view engine', 'ejs');


// Middleware
app.use(body_parser.urlencoded({ extended: true }));

// connect mongo db
mongoose.connect('mongodb://localhost:27017/UserInfo')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    
// Schema

const formSchema = new mongoose.Schema({
    
    name: String,
    mobile: String,
    email: String,
    dob: String,
    address: String,
    charge: Number,
    about: String,
    services: String,
    experience: Number,
    projects: String
})

// Create Model

const Form = mongoose.model('Form', formSchema);


// Serve Form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dataForm.html')
})

// Add in database

app.post("/submit-profile", async (req, res) => {
    try {
        const newForm = Form({
    
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            dob: req.body.dob,
            address: req.body.address,
            charge: req.body.charge,
            about: req.body.about,
            services: req.body.services,
            experience: req.body.experience,
            projects: req.body.projects,
        })

        await newForm.save();

        const userData = await Form.findOne({email : req.body.email})

        res.render('profileTemplet' , {

            name : userData.name,
            address : userData.address
        });

        // res.status(200).send('Profile submitted successfully!');
    }
    catch (err) {
        res.status(500).send('Error saving data.');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

