/* This module is used to make calls to the GMI API. postToGMI accepts two arguments.
   vehicle: object containing vehicle information used by GMI API
   url: url specific to current GMI API call
*/

// Import Node Modules
const rp = require('request-promise');

async function postToGMI(vehicle, url) {
  const vehicleJson = await JSON.stringify(vehicle);
  const options = {
    url: url,
    headers: {'content-type' : 'application/JSON'},
    body: vehicleJson,
  };
  const response = rp.post(options);
  return response;
}

module.exports.postToGMI = postToGMI;
