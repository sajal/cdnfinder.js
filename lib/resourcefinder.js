var page = require('webpage').create(),
  t, address;
var resources = {};

var getHostname = function(str) {
  // stollen from http://beardscratchers.com/journal/using-javascript-to-get-the-hostname-of-a-url
  try{
    var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
    return str.match(re)[1].toString();
  } catch (err) {
    //probably data uri which we dont care abt
    //console.log(str)
    return null;
  }
}

var makeheaderguess = function(headers){
  //Attempt to guess headers off response headers, will use this if DNS can't guess
  var newheaders = {}
  var key, value, i;
  var cdn = null;
  //console.log(JSON.stringify(headers))
  for(i=0;i<headers.length;i++){
    key = headers[i].name.toLowerCase()
    value = headers[i].value.toLowerCase()
//       console.log(key, value)
    newheaders[key] = value;
  }
  //Too add more providers, please send pull requests. Make sure to be descriptive.
  //Cloudflare advertises a custom Server header
  cdn = (newheaders["server"] == "cloudflare-nginx" ? "Cloudflare":cdn);
  //China cache sends a Powered-By-Chinacache header
  cdn = (newheaders["powered-by-chinacache"] ? "ChinaCache":cdn);
  //OnApp edge servers use X-Edge-Location to indicate the location
  cdn = (newheaders["x-edge-location"] ? "OnApp":cdn);
  //CloudFront adds in some custom tracking id
  cdn = (newheaders["x-amz-cf-id"] ? "Amazon Cloudfront":cdn);
  //Bitgravity adds edge hostname to Via header
  cdn = (newheaders["via"] && (newheaders["via"].indexOf("bitgravity.com") != -1)  ? "Bitgravity":cdn);
  return cdn;
}


var makereport = function(input){
  var key, keys, basepagedomain, output, i;
//    console.log("making report")
  keys = Object.keys(input.resources);
  //console.log(JSON.stringify(keys))
  for (i=0;i<keys.length;i++){
    key = keys[i];
    input.resources[key].headerguess = makeheaderguess(input.resources[key].headers);
    input.resources[key].isbase = input.basepagehost == key;
    input.resources[key].hostname = key;
    //delete input.resources[key].headers;
  }
  //nodejs app reads from console
  console.log(JSON.stringify(input));
}


t = Date.now();
address = phantom.args[0];
page.onResourceReceived = function(request){
  var url, size, hostname, headers, i;
  var headers = request.headers;
//        console.log(JSON.stringify(request));
  url = request.url;
  if (!(size)){
    size = (request.bodySize ? request.bodySize: 0);
  }
  //console.log(url); 
  hostname = getHostname(url);
  if ((hostname) && (size > 0)){
    if (!(resources[hostname])){
      resources[hostname] = {}
      resources[hostname].count = 0
      resources[hostname].bytes = 0
    }
    resources[hostname].count += 1
    //phantomjs lies! so we see content-length header is available
    for (i=0;i<headers.length;i++){
      if (headers[i].name.toLowerCase() == "content-length"){
        size = parseInt(headers[i].value);
        break;
      }
    }

    resources[hostname].bytes += size
    //save the last response headers per host
    resources[hostname].headers = headers
  }
}
page.open(address, function (status) {
  var output;
  if (status !== 'success') {
    console.log('{"error": "FAIL"}');
  } else {
    t = Date.now() - t;
//            console.log('Loading time ' + t + ' msec');
    output = {};
    output.basepagehost = page.evaluate(function () {
        return document.location.hostname;
    });
    
    output.resources = resources;
    makereport(output);
    //console.log(JSON.stringify(output));
  }
  phantom.exit();
});
