/* The functions in this module are used to parse the GMI API response. These functions
   are responsible for parsing GMI responses
   Each function takes one argument.
   val: the JSON parsed response from the GMI API
*/

/* Response: {
  "vin": "1213231",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
} */
function getVehicleInfo(val) {
  const doorCount = (val.data.fourDoorSedan.value === 'True') ? 4: 2;
  // insert additional checks here
  var message = {
    vin: val.data.vin.value,
    color: val.data.color.value,
    doorCount: doorCount,
    driveTrain: val.data.driveTrain.value,
  };
  return message;
}

/* Response: [
  {
    "location": "frontLeft",
    "locked": true
  },
  {
    "location": "frontRight",
    "locked": true
  }
] */
function getDoorSecurity(val) {
  let message = [];
  const doors = val.data.doors.values;
  for (var i = 0; i < doors.length; i++) {
      var currentDoor = {
        location: doors[i].location.value,
        locked: (doors[i].locked.value === 'True') ? true : false
      }
      message.push(currentDoor);
  }
  return message
}

/* Response: {
  "percent": 50
} */
function getBattery(val) {
  const batteryLevel = val.data.batteryLevel.value === 'null' ? null : parseInt(val.data.batteryLevel.value);
  return {"percent": batteryLevel}
}

/* Response: {
  "percent": 30
} */
function getFuel(val) {
  const tankLevel = val.data.tankLevel.value === 'null' ? null : parseInt(val.data.tankLevel.value);
  return {"percent": tankLevel}
}

/* Response: {
  "status": "success|error"
} */
function alterEngine(val) {
  let status = 'There was an error by GMI';
  if (val.actionResult.status === 'FAILED') {
    status = 'error';
  } else {
    status = 'success';
  }
  return {status: status}
}

module.exports.alterEngine = alterEngine;
module.exports.getBattery = getBattery;
module.exports.getFuel = getFuel;
module.exports.getDoorSecurity = getDoorSecurity;
module.exports.getVehicleInfo = getVehicleInfo;
