var connection = require('../config/connection')


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// object for all SQL statement functions.

var orm = {
  // this one makes sense
  all: function (tableInput, cb) {
    var queryString = ' SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result)
      console.log('queryString from selectAll', queryString);
      console.log('result from selectAll', result);
    })
  },

  create: function (table, cols, vals, cb) {
    // this is confusing - used cats example
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log('queryString from create', queryString);
    // console.log('result from insertOne', result);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
      console.log('create', result);
    });
  },

  update: function (table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;
    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log('queryString update', queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log('result update', result);
    });
  },

  delete: function (table, condition, cb) {
    var queryString = 'DELETE FROM ' + table;
    queryString += ' WHERE ';
    queryString += condition;

    console.log('queryString delete', queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });

  }
}
// Export the orm object for the model.
module.exports = orm;