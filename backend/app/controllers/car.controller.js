const Car = require('../models/car.model.js');
 
// POST a Car
exports.createCar = (req, res) => {

    const car = new Car({
                         make: req.body.make,
                          model: req.body.model,
                          year: req.body.year,
                          Color: req.body.color,
                        });
 
    // Save a Car in the MongoDB
    car.save().then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    res.status(500).json({
                      message: "Fail!",
                      error: err.message
                    });
                });
};
  
// FETCH all Cars
exports.cars = (req, res) => {
    Car.find().select('-__v').then(carInfos => {
          res.status(200).json(carInfos);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
};

// get a Car by Id
exports.getCar = (req, res) => {
  Car.findById(req.params.id).select('-__v')
      .then(car => {
        res.status(200).json(car);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Car not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving Car with id " + req.params.id,
              error: err
          });
      });
};
 
// UPDATE a Car
exports.updateCar = (req, res) => {
    // Find car and update it
    Car.findByIdAndUpdate(
                      req.body._id, 
                      {
                        make: req.body.make,
                        model: req.body.model,
                        year: req.body.year,
                        color: req.body.color
                      }, 
                        {new: true}
                    ).select('-__v')
        .then(car => {
            if(!car) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a car with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(car);
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can not update a car with id = " + req.params.id,
              error: err.message
            });
        });
};

// DELETE a Car
exports.deleteCar = (req, res) => {
    let carId = req.params.id

    Car.findByIdAndRemove(carId).select('-__v -_id')
        .then(car => {
            if(!car) {
              res.status(404).json({
                message: "Does Not exist a Car with id = " + carrId,
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can NOT delete a car with id = " + carId,
              error: err.message
            });
        });
};