module.exports = function(app) {
 
  var cars = require('../controllers/car.controller.js');

  app.post('/api/car', cars.createCar);
  app.get('/api/car/:id', cars.getCar);
  app.get('/api/cars', cars.cars);
  app.put('/api/car', cars.updateCar);
  app.delete('/api/car/:id', cars.deleteCar);
}