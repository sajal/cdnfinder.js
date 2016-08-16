// Too add more providers, please send pull requests. Make sure to be descriptive.
var CDN_PROVIDER  = [
  [".clients.turbobytes.com", "Turbobytes"],
  [".akamai.net", "Akamai"],
  [".cdn.bitgravity.com", "Bitgravity"],
  [".akamaiedge.net", "Akamai"],
  [".llnwd.net", "Limelight"],
  [".systemcdn.net", "EdgeCast"],
  [".cdn77.net", "CDN77"],
  [".edgecastcdn.net", "EdgeCast"],
  [".hwcdn.net", "Highwinds"],
  [".panthercdn.com", "CDNetworks"],
  [".simplecdn.net", "Simple CDN"],
  [".instacontent.net", "Mirror Image"],
  [".mirror-image.net", "Mirror Image"],
  [".cap-mii.net", "Mirror Image"],
  [".footprint.net", "Level3"],
  [".ay1.b.yahoo.com", "Yahoo"],
  [".yimg.", "Yahoo"],
  [".google.", "Google"],
  ["googlesyndication.", "Google"],
  ["youtube.", "Google"],
  [".googleusercontent.com", "Google"],
  [".l.doubleclick.net", "Google"],
  [".internapcdn.net", "Internap"],
  [".cloudfront.net", "Amazon Cloudfront"],
  [".netdna-cdn.com", "MaxCDN"],
  [".netdna-ssl.com", "MaxCDN"],
  [".netdna.com", "MaxCDN"],
  [".cotcdn.net", "Cotendo"],
  [".cachefly.net", "Cachefly"],
  ["bo.lt", "BO.LT"],
  [".cloudflare.com", "Cloudflare"],
  [".afxcdn.net", "afxcdn.net"],
  [".lxdns.com", "ChinaNetCenter"],
  [".att-dsa.net", "AT&T"],
  [".vo.msecnd.net", "Windows Azure"],
  [".voxcdn.net", "Voxel"],
  [".bluehatnetwork.com", "Blue Hat Network"],
  [".swiftcdn1.com", "SwiftCDN"],
  [".rncdn1.com", "Reflected Networks"],
  [".cdngc.net", "CDNetworks"],
  [".gccdn.net", "CDNetworks"],
  [".gccdn.cn", "CDNetworks"],
  [".fastly.net", "Fastly"],
  [".fastlylb.net", "Fastly"],
  [".gslb.taobao.com", "Taobao"],
  [".gslb.tbcache.com", "Alimama"],
  [".ccgslb.com", "ChinaCache"],
  [".ccgslb.net", "ChinaCache"],
  [".c3cache.net", "ChinaCache"],
  [".chinacache.net", "ChinaCache"],
  [".c3cdn.net", "ChinaCache"],
  [".akadns.net", "Akamai"],
  [".cdn.telefonica.com", "Telefonica"],
  [".azioncdn.net", "Azion"],
  [".anankecdn.com.br", "Ananke"],
  [".kxcdn.com", "KeyCDN"],
  [".lswcdn.net", "LeaseWeb CDN"],
  [".akamaitechnologies.com", "Akamai"],
]

exports.guesscdnbycname = function(item, callback){
  //var cnames = item.cnames;
  //todo, guess cdn by CNAME chain, leave null if dunno
  var cdn = null;
  var i,j;
  var cnames = item.cnames;
  //cnames.push(item.hostname);
  if (cnames.length > 0){

    for(j=0;j<cnames.length;j++){

      for(i=0;i<CDN_PROVIDER.length;i++){
        if (cnames[j].indexOf(CDN_PROVIDER[i][0]) != -1){
          cdn = CDN_PROVIDER[i][1];
          break;
        }
      }
      if (cdn){
        break;
      }
    }
  }
  //if cdn is still null, use fallback
  if (cdn == null){
    cdn = item.headerguess;
  }
  item.cdn = cdn;
  callback(null, item);
}

//guesscdnbycname({"hostname": "msnbcmedia.msn.com", cnames: ["foo.bar.com", "cdn.example.com"]}, function(err, result){
//  console.log(result)
//})
