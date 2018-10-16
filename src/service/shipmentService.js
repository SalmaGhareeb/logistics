const request = require("request");


var fetch = () => {
    var options = {
        url: encodeURI('https://api.myjson.com/bins/b9ix6​'),
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};


module.exports = {
    fetch
};