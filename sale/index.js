var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//make schema and model here
var salesSchema = mongoose.Schema({
  quantity: Number,
  location: String,
  start_time: Date,
  end_time: Date,
  seller: {first: String, last: String},
  buyer: {first: String, last: String},
  status: Boolean
});

var Sale = mongoose.model('Sale', salesSchema);

/*
var sale1 = new Sale;

sale1.quantity = 1;
sale1.location = 'bplate';
sale1.start_time = Date.now;
sale1.end_time = 'Jun 26, 2016';
sale1.seller.first = 'Yi Zu';
sale1.seller.last = 'Tan';
sale1.buyer.first = 'Wei';
sale1.buyer.last = 'Li';
sale1.status = true;
*/

router.get('/testcreate', function(req, res, next) {

  // create a todo, information comes from AJAX request from Angular
  Sale.create({
    quantity: 1,
    location: 'bplate',
    start_time: Date.now(),
    end_time: Date.now(),
  }, function(err, sale) {
      if (err)
          res.send(err);

      // get and return all the todos after you create another
      Sale.find(function(err, sales) {
          if (err)
              res.send(err)
          res.json(sales);
      });
  });
})

/* GET sales listing. */
router.get('/', function(req, res, next) {

  // use mongoose to get all todos in the database
  Sale.find(function(err, sales) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
          res.send(err)

      res.json(sales); // return all todos in JSON format
  });

});

/* CREATE sales listing. */
router.post('/', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Sale.create({
      sale_id: req.body.sale_id,
      quantity: req.body.quantity,
      location: req.body.location,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      seller: {first: req.body.seller.first, last: req.body.seller.last},
      buyer: {first: req.body.buyer.first, last: req.body.buyer.last},
      status: req.body.status
    }, function(err, sale) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Sale.find(function(err, sales) {
            if (err)
                res.send(err)
            res.json(sales);
        });
    });

});

/* DELETE sales listing. */
router.delete('/:sale_id', function(req, res) {
    Sale.remove({
        _id : req.params.sale_id
    }, function(err, sale) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Sale.find(function(err, sales) {
            if (err)
                res.send(err)
            res.json(sales);
        });
    });
});

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
