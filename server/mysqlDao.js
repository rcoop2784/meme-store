var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw",
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  //var createTable = "CREATE TABLE IF NOT EXISTS rating (ratee VARCHAR(256), stars TINYINT, comment VARCHAR(1024));";
  var createTable = "CREATE TABLE IF NOT EXISTS UrlString (URL VARCHAR(256), ID TINYINT, Category VARCHAR(64));";

  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = {
  deleteRating: function (ratee, stars, comment) {
    //TODO
  },
  
  getAllRatings: function() {
    //TODO
  },
  
  insertRating: function (ratee, stars, comment) {
    con.query("INSERT INTO rating VALUES ( ? )", [[ratee, stars, comment]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  },

  insertMeme: function (URL, ID, Category) {
    con.query("INSERT INTO UrlString VALUES ( ? )", [[URL, ID, Category]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  }
  getMeme: function () {
    return new Promise ( resolve => {
    con.query("SELECT URL, ID, Category FROM UrlString",
    function(err, result, fields){
      if(err) throw err;

      resolve(result[0].URL)
    })

    });
  }
};
