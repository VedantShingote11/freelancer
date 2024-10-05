const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')

const app = express();
app.set('view engine', 'ejs')

app.use(body_parser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/UserInfo')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Form = mongoose.model('Form', formSchema);

async function getAllForms() {
    try {
        const allForms = await Form.find();  // Retrieve all documents
        console.log('All Forms:', allForms); // Print the results to the console
    } catch (err) {
        console.error('Error fetching documents:', err);
    }
}
async function findFormByEmail(email) {
    try {
        const form = await Form.findOne({ email : email });  // Search by email
        if (form) {
            console.log('Form found:', form);
        } else {
            console.log('No form found with this email.');
        }
    } catch (err) {
        console.error('Error fetching document by email:', err);
    }
}

// Call the function with the desired email
// getAllForms();
findFormByEmail('xyz@gmail.com');
