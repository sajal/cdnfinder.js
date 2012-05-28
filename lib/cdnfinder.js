var Step = require("step"),
  feturlhosts = require("./phantomdriver.js").feturlhosts,
  fetchcnamechain = require("./cnamechainfinder.js").fetchcnamechain,
  guesscdnbycname = require("./guesscnamecdn.js").guesscdnbycname;


exports.completecdnfinder = Step.fn(
  function getresources(url) {
    console.log(new Date(), "Fetching page in phantom.js");
    feturlhosts(url, this);
  },
  function getcnames(err, result){
    if (err) throw err;
    //console.log(result);
    console.log(new Date(), "Fetching CNAMES");
    var group = this.group();
    var keys = Object.keys(result.resources);
    keys.forEach(function(hostname){
      fetchcnamechain(result.resources[hostname], group());
    });
  },
  function guesscnamecdn(err , results) {
    if (err) throw err;
    console.log(new Date(), "Guessing CDN");
    var group = this.group();
    results.forEach(function(result){
      //console.log(result)
      guesscdnbycname(result, group());
    });
  },
  function finalize(err, results){
    if (err) throw err;
    console.log(new Date(), "finaling");
    //sort by count
    results.sort(function(a, b){
      return b.count - a.count
    });
    var output = {}
    output.assetcdn = results[0].cdn;
    for (i=0;i<results.length;i++){
      if (results[i].isbase){
        output.basecdn = results[i].cdn;
        break;
      }
    }
    output.everything = results;
    return output;
  }
);

//completecdnfinder("http://www.msnbc.com/", function(err, results){
//  console.dir(results);
//});