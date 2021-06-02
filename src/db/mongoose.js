const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/blog', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
  });
