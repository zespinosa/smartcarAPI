/* The functions in this module are used to handle errors. These functions
   Each function takes one argument.
   val: the JSON parsed response from the GMI API
*/

// Error handling for Vehicle Info
function handleVehicleError(val) {
  if (val !== undefined && parseInt(val.status) === 404) {
    return val.reason;
  } else {
    return 'Unable to retrieve vehicle information from GMI.';
  }
}

// Error handling for Security
function handleDoorError(val) {
  if (val !== undefined && parseInt(val.status) === 404) {
    return val.reason;
  } else {
  return 'Unable to retrieve door security from GMI.';
  }
}

// Error handling for Battery
function handleBatteryError(val) {
  if (val !== undefined && parseInt(val.status) === 404) {
    return val.reason;
  } else {
  return 'Unable to retrieve battery level from GMI.';
  }
}

// Error handling for Fuel
function handleFuelError(val) {
  if (val !== undefined && parseInt(val.status) === 404) {
    return val.reason;
  } else {
  return 'Unable to retrieve fuel level from GMI.';
  }
}

// Error handling for Engine
function handleEngineError(val) {
  if (val !== undefined && parseInt(val.status) === 404) {
    return val.reason;
  } else {
  return 'Unable alter engine due to GMI error.';
  }
}

module.exports.handleVehicleError = handleVehicleError;
module.exports.handleDoorError = handleDoorError;
module.exports.handleBatteryError = handleBatteryError;
module.exports.handleFuelError = handleFuelError;
module.exports.handleEngineError = handleEngineError;
