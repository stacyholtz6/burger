var express = require("express");

var router = express.Router();

// import the model (burger.js) to use its database functions
var burger = require('../models/burger');


// ****** Create routes ********

// get route - read or retrieve
router.get('/', function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log('hbsObject get route', hbsObject);
    res.render('index', hbsObject);
  })
})
// post route - create
router.post("/api/burgers", function (req, res) {
  burger.insertOne([
    'burger_name', 'devoured'
  ], [
    req.body.burger_name, req.body.devoured
  ], function (result) {

    res.json({ id: result.insertId });
  });
});
// put route - update
router.put('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition - from controller', condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// delete route - delete - duh
router.delete('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // if no rows were changed then ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
