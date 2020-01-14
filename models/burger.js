var orm = require('../config/orm.js');

var burger = {
  all: function (cb) {
    orm.all('burgers', function (res) {
      cb(res);
    });
  },

  create: function (cols, vals, cb) {
    orm.create('burgers', cols, vals, function (res) {
      cb(res);
    });
  },

  // insertOne: function (name, cb) {
  //   orm.insertOne('burgers', [
  //     'burger_name', 'devoured'
  //   ],
  //     [name, false], cb);
  // },

  update: function (objColVals, condition, cb) {
    // var condition = 'id=' + condition;
    orm.update('burgers', objColVals, condition, function (res) {
      cb(res);
    });
  },

  // updateOne: function (id, cb) {
  //   var condition = 'id=' + id;
  //   orm.updateOne('burgers', {
  //     devoured: true
  //   }, condition, cb);
  // },

  delete: function (condition, cb) {
    orm.delete('burgers', condition, function (res) {
      cb(res);
    });

  }

};

// Export the database functions for the controller (burger_controller.js).
module.exports = burger;