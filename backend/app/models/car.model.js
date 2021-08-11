const mongoose = require('mongoose');
 
const CarSchema = mongoose.Schema({
    make: String,
    model: String,
   color: String,
    year: { 
      type: Number, 
      min: 1980, 
      max: 2030, 
      required: true 
    },
    status: {
      type: String,
      default: 'Available' 
    }
});

module.exports = mongoose.model('Car', CarSchema);