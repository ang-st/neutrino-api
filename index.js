const request = require("request")
const Promise = require("promise")
const querystring = require("querystring")

const BASEURL = "https://neutrinoapi.com/"
function Neutrino(config){
  //this.config = {"user-id":clientId, "api-key": apiKey }
  this.config = config
}


Neutrino.prototype.request = function(method, param){
  var self = this
  return new Promise(function(resolve, reject){
    var params = {}
    for (var attr in self.config){params[attr] = self.config[attr]}
    for (var attr in param ){params[attr] = param[attr]}
    console.log(params)
    console.log( querystring.stringify(params))

  request({
      method: 'POST',
      url: BASEURL+method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(params)
    }, function (err, resp, body) {
      var content = null

      if (err || resp.statusCode != 200)
        return reject(err)
      
      content = JSON.parse(body)
      if (content.error)
        return reject(content.errorMessage)
      else 
        return resolve(content)

    })
  })

}

/*
  {bin-number:"", customer-ip:}
*/
Neutrino.prototype.binCode=function(options){
  return this.request("bin-lookup", options)

} 

Neutrino.prototype.ipBlockList = function(options){
  return this.request("ip-blocklist", options)

}

Neutrino.prototype.ipInfo = function(options){
  return this.request("ip-info", options)

}


Neutrino.prototype.HLRLookup = function(options){
  return this.request("hlr-lookup", options)

}


Neutrino.prototype.geoAddress = function(options){
  return this.request("geocode-address", options)

}


module.exports =  Neutrino
