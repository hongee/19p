var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
