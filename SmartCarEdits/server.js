// Import Express for Servers
const express = require('express');

// Import Node Modules
const bodyParser = require('body-parser');

// Import Local Functions
const gmiSuccess = require('./gmiSuccess');
const gmiFailure = require('./gmiFailure');
const GMI= require('./GMI');

// Setup App
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log('Server started! At http://localhost:' + port));

// Get Vehicle Information
app.get('/vehicles/:id', function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getVehicleInfoService';
  const gmi = GMI.postToGMI(vehicle, url);
  gmi.then(function (body) {
    const val = JSON.parse(body);
    if (parseInt(val.status) === 200) {
      res.status(200).send(gmiSuccess.getVehicleInfo(val));
    } else {
      res.status(404).send(gmiFailure.handleVehicleError(val));
    }
  })
  .catch(function (err) {
    res.status(400).send(gmiFailure.handleVehicleError());
  });
});

// Get Door Security
app.get('/vehicles/:id/doors', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getSecurityStatusService';
  const gmi = GMI.postToGMI(vehicle, url);
  gmi.then(function (body) {
    const val = JSON.parse(body);
    if (parseInt(val.status) === 200) {
      res.status(200).send(gmiSuccess.getDoorSecurity(val));
    } else {
      res.status(404).send(gmiFailure.handleDoorError(val));
    }
  })
  .catch(function (err) {
    res.status(400).send(gmiFailure.handleDoorError());
  });
});

// Get Fuel Range
app.get('/vehicles/:id/fuel', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getEnergyService';
  const gmi = GMI.postToGMI(vehicle, url);
  gmi.then(function (body) {
    const val = JSON.parse(body);
    if (parseInt(val.status) === 200) {
      res.status(200).send(gmiSuccess.getFuel(val));
    } else {
      res.status(404).send(gmiFailure.handleFuelError(val));
    }
  })
  .catch(function (err) {
    res.status(400).send(gmiFailure.handleFuelError());
  });
});

// Get Battery Range
app.get('/vehicles/:id/battery', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getEnergyService';
  const gmi =  GMI.postToGMI(vehicle, url);
  gmi.then(function (body) {
    const val = JSON.parse(body);
    if (parseInt(val.status) === 200) {
      res.status(200).send(gmiSuccess.getBattery(val));
    } else {
      res.status(404).send(gmiFailure.handleBatteryError(val));
    }
  })
  .catch(function (err) {
    res.status(400).send(gmiFailure.handleBatteryError());
  });
});

// Start|Stop Engine
app.post('/vehicles/:id/engine', async function(req, res) {
  let command = null;
  if (req.body.action === 'START') {
    command = "START_VEHICLE";
  } else if (req.body.action === 'STOP') {
    command = 'STOP_VEHICLE';
  } else {
    res.status(404).send('Error, incorrect command');
    return;
  }
  const vehicle = {
    id: req.params.id,
    command: command,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/actionEngineService'
  const gmi = GMI.postToGMI(vehicle, url);
  gmi.then(function (body) {
    const val = JSON.parse(body);
    if (parseInt(val.status) === 200) {
      res.status(200).send(gmiSuccess.alterEngine(val));
    } else {
      res.status(404).send(gmiFailure.handleEngineError(val));
    }
  })
  .catch(function (err) {
    res.status(400).send(gmiFailure.handleVehicleError());
  });
});

// Exporting the app module
module.exports = app;
