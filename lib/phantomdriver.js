var exec = require('child_process').exec,
  path = require('path'),
  PHANTOM_BIN = path.join('phantomjs'),
  RESOURCEFINDER_JS = path.join(__dirname, 'resourcefinder.js');

exports.feturlhosts = function(url, callback){
  var command = PHANTOM_BIN + ' ' + RESOURCEFINDER_JS + ' ' + url; //VALIDATE URL!!!!!11
    exec(command, function (error, output) {
    try{
      callback(null, JSON.parse(output));
    } catch (err) {
      callback(err)
    }
  });
}


//feturlhosts("http://www.wordans.com/", function(result){
  //console.log(result);

//});
