var assert = require('assert'),
  cdnfinder = require('../lib/main');

var EXPECTATION = [
  ["netdna.cdnplanet.com", "MaxCDN"],
  ["bg.cdnplanet.com", "Bitgravity"],
  ["cloudfront.cdnplanet.com", "Amazon Cloudfront"],
  ["cdn77.cdnplanet.com", "CDN77"],
  ["ec.cdnplanet.com", "EdgeCast"],
  ["fastly.cdnplanet.com", "Fastly"],
  ["cc.cdnplanet.com", "ChinaCache"],
  ["internap1.cdnplanet.com", "Internap"],
  ["hwnd.cdnplanet.com", "Highwinds"],
  ["lvl3.cdnplanet.com", "Level3"]
]

var testhostnamefinder = function(testcase){
  cdnfinder.hostnamefinder(testcase[0], function(result){
    var failmessage = testcase[0] + " should be " + testcase[1] + " but got " + result
    assert.equal(result, testcase[1], failmessage);
  })  
}

EXPECTATION.forEach(function(testcase){
  testhostnamefinder(testcase);
})
