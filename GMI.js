/* This module is used to make calls to the GMI API. postToGMI accepts four arguments.
   res: a response to be sent to SmartCar clients
   vehicle: object containing vehicle information used by GMI API
   url: url specific to current GMI API call
   callback: handles GMI response  
*/

// Import Node Modules
const request = require('request');

async function postToGMI(res, vehicle, url, callBack) {
  const vehicleJson = await JSON.stringify(vehicle);
  const options = {
    url: url,
    headers: {'content-type' : 'application/JSON'},
    body: vehicleJson,
  };
  /* This is a closure: self-invoking function that keeps vehicleInfo and options in scope
     to be used by callback. */
  (async function(res, options) {
    await request.post(options,
      async function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const val = await JSON.parse(body);
          if (val.status !== '200') {
            res.send(val.reason);
          } else {
            callBack(val, res);
          }
        }
      }
    );
  })(res, options);
}

module.exports.postToGMI = postToGMI;
