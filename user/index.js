var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('./model');

router.get('/', function(req,res) {
  res.send("hasd");
})


router.get('/testcreate', function(req, res, next) {
  // create a todo, information comes from AJAX request from Angular
  User.create({
    facebook :{
      id: '19349',
      token: '298943',
      email: 'dragonballrulez@gmail.com',
      name: 'Tan Yi Zu'
    }
  }, function(err, user) {
      if (err)
          res.send(err);

      // get and return all the todos after you create another
      User.find(function(err, users) {
          if (err)
              res.send(err)
          res.json(users);
      });
  });
})

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

/* GET users listing.
router.get('/', function(req, res, next) {
  res.json(

  )
});
*/
module.exports = router;

/*
router.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});
*/
