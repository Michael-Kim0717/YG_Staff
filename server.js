// Dependencies.
const 
    clients = require('./controller/apiClients'),
    express = require('express'),
    exphps = require('express-handlebars'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    mongojs = require('mongojs');

// If deployed, use the deployed database.
// Otherwise use the local BYGStaff database.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/BYGStaff";

// Set mongoose to leverage built in JavaScript ES6 Promises.
// Connect to the Mongo DB.
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Hook models into the db variable.
var db = require("./models");

// Initialize Express.
const app = express();

// Adding in Handlebars.
app.engine('handlebars',exphps({defaultLayout:'main'}));
app.set('view engine','handlebars');

// Setting the base path to be used.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
clients(app);

// Setting a base port to be used.
const PORT = 9001;

// ------------------------POST AND GET REQUESTS---------------------------

// Retrieve data from the db to be used to populate the home page
app.get('/directory', function(request, response) {
    // Find all results from the scrapedData collection in the db
    db.Student.find({}).sort({grade: 1, name: 1})
        .then(function(dbStudent){
            console.log(dbStudent);
            response.json(dbStudent);
        })
        .catch(function(error){
            response.json(error);
        });
});

// Retrieve data from the db to be used when a certain grade is selected
app.get('/directory/:grade', function(request, response) {
    // Find all results from the scrapedData collection in the db
    db.Student.find({grade: request.params.grade}).sort({grade: 1, name: 1})
        .then(function(dbStudent){
            console.log(dbStudent);
            response.json(dbStudent);
        })
        .catch(function(error){
            response.json(error);
        });
});

// Retrieve data from the db to be used when a certain month is selected
app.get('/birthday/:month', function(request, response) {
    // Find all results from the scrapedData collection in the db
    db.Student.find({birthday: new RegExp(request.params.month + '+')}).sort({birthday: 1, grade: 1, name: 1})
        .then(function(dbStudent){
            console.log(dbStudent);
            response.json(dbStudent);
        })
        .catch(function(error){
            response.json(error);
        });
});

// When the user clicks the Add Student button,
// Add the student onto the database
app.post('/all/students', function(request, response){
    db.Student.create(request.body)
        .then(function(dbStudent){
            console.log("SERVER.JS DBSTUDENT: " + dbStudent);
        })
        .catch(function(error){
            response.json(error);
        });
});

// When the user clicks the Edit Student button
// Add the student information into the modal
app.get('/edit/students/:id', function(request, response){
    db.Student.find({ _id : request.params.id })
        .then(function(dbStudent){
            console.log(dbStudent);
        })
        .catch(function(error){
            response.json(error);
        })
});

// When the user clicks the Delete Student button
// Delete the student from the database
app.put('/delete/students/:id', function(request, response){
    db.Student.deleteOne({ _id : request.params.id })
        .then(function(dbStudent){
            console.log(dbStudent);
        })
        .catch(function(error){
            response.json(error);
        })
});

// ------------------------------------------------------------------------

// Setting up a base port to be used.
app.listen(PORT,()=>{
    console.log(`Server listen at door:${PORT}`);
});