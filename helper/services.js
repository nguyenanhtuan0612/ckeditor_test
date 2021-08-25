const request = require('sync-request');

const callAPI = function(url, method , jsonData = null, token = null, shopid = null) {
    var res = request(method, url, {
      headers: {
        "Authorization": token,
        "Token": token,
        "ShopId": shopid,
      },
      json: jsonData

    });
    //console.log(res.getBody());
    return JSON.parse(res.getBody('utf8'));
}

module.exports = {
    callAPI
}