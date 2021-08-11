var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Car = require('./app/models/car.model.js');
 
mongoose.Promise = global.Promise;
 
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Successfully connected to MongoDB.");   
        const cars = [
            { make: 'Toyota', model: 'Sienna', 
                      year: 2020, color: 'Silver'},
            { make: 'Ford', model: 'Escape', 
                      year: 2016, color: 'Blue'},
            { make: 'Nissan', model: 'Sports', 
                      year: 2018, color: 'White'},
          ]

        for(let i=0; i<cars.length; i++){

            const car = new Car({
                make: cars[i].make,
                model: cars[i].model,
                year: cars[i].year,
               color: cars[i].color
              });

            // Save a Car in the MongoDB
            await car.save();
        }
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

require('./app/routes/car.router.js')(app);
// Create a Server
var server = app.listen(8080, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port) 
})