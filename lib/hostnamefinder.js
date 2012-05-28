var fetchcnamechain = require("./cnamechainfinder.js").fetchcnamechain,
  guesscdnbycname = require("./guesscnamecdn.js").guesscdnbycname;

exports.hostnamefinder = function(hostname, callback){
  fetchcnamechain({"hostname": hostname}, function(err, result){
    guesscdnbycname(result, function(err, result){
      callback(result.cdn);
    })
  })
}