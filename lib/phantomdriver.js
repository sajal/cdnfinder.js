var exec = require('child_process').exec,
  path = require('path'),
  PHANTOM_BIN = path.join('phantomjs'),
  RESOURCEFINDER_JS = path.join(__dirname, './resourcefinder.js');

exports.feturlhosts = function(url, callback){
  var command = PHANTOM_BIN + ' ' + RESOURCEFINDER_JS + ' ' + url; //VALIDATE URL!!!!!11
    exec(command, function (error, output) {
    try{
      output.split("\n").forEach(function(line){
        if (line.indexOf("{") == 0){
          //Make sure the line begins with { to indicate its really json.
          callback(null, JSON.parse(line));
        }
      });
    } catch (err) {
      callback(err)
    }
  });
}


exports.feturlhosts("http://www.turbobytes.com/", function(err, result){
  console.log(result);

});
