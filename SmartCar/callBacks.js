/* The functions in this module are used as callBacks to the GMI API. These functions
  are responsible for parsing GMI responses and returning relevant information to SmartCar clients.
  Each function takes two arguments.
  val: the JSON parsed response from the GMI API
  res: a response to be sent to SmartCar clients */

/* Response: {
  "vin": "1213231",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
} */
function getVehicleInfo(val, res) {
  const doorCount = (val.data.fourDoorSedan.value === 'True') ? 4: 2;
  res.send({
    vin: val.data.vin.value,
    color: val.data.color.value,
    doorCount: doorCount,
    driveTrain: val.data.driveTrain.value,
  });
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
function getDoorSecurity(val, res) {
  let data = {};
  const doors = val.data.doors.values;
  for (var i = 0; i < doors.length; i++) {
      data[doors[i].location.value] = (doors[i].locked.value === 'True') ? true : false;
  }
  res.send(data);
}

/* Response: {
  "percent": 50
} */
function getBattery(val, res) {
  const batteryLevel = val.data.batteryLevel.value === 'null' ? null : parseInt(val.data.batteryLevel.value);
  res.send({"percent": batteryLevel});
}

/* Response: {
  "percent": 30
} */
function getFuel(val, res) {
  const tankLevel = val.data.tankLevel.value === 'null' ? null : parseInt(val.data.tankLevel.value);
  res.send({"percent": tankLevel});
}

/* Response: {
  "status": "success|error"
} */
function alterEngine(val, res) {
  let status = 'There was an error by GMI';
  if (val.actionResult.status === 'FAILED') {
    status = 'error';
  } else {
    status = 'success';
  }
  res.send({status: status});
}

module.exports.alterEngine = alterEngine;
module.exports.getBattery = getBattery;
module.exports.getFuel = getFuel;
module.exports.getDoorSecurity = getDoorSecurity;
module.exports.getVehicleInfo = getVehicleInfo;
