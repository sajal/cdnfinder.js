var dns = require('native-dns'),
  DNS_SERVER = "8.8.8.8";

exports.fetchcnamechain = function(item, callback){
  item.cnames = [];
  item.cnames.push(item.hostname);
  var question = dns.Question({
    name: item.hostname,
    type: 'A',
  });
  var req = dns.Request({
    question: question,
    server: { address: DNS_SERVER, port: 53, type: 'udp' },
    timeout: 5000,
  });
  req.on('timeout', function () {
    console.log("TIMEOUT")
    callback(null, item)
  });
  req.on('message', function (err, answer) {
    answer.answer.forEach(function (a) {
      if (a.type == 5){ //is CNAME
        item.cnames.push(a.data);
      }
    });
  });
  req.on('end', function () {
    callback(null, item)
  });
  req.send();
}

//fetchcnamechain({"hostname": "msnbcmedia.msn.com"}, function(err, result){
//  console.log(result)
//})
