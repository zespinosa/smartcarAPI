// Import Express for Servers
const express = require('express');

// Import Node Modules
const bodyParser = require('body-parser');

// Import Local Functions
const callBacks = require('./callBacks');
const GMI= require('./GMI');

// Setup App
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => console.log('Server started! At http://localhost:' + port));

// Get Vehicle Information
app.get('/vehicles/:id', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getVehicleInfoService';
  await GMI.postToGMI(res, vehicle, url, callBacks.getVehicleInfo);
});

// Get Door Security
app.get('/vehicles/:id/doors', async function(req, res) {
    const vehicle = {
      id: req.params.id,
      responseType: "JSON",
    };
    const url = 'http://gmapi.azurewebsites.net/getSecurityStatusService';
    await GMI.postToGMI(res, vehicle, url, callBacks.getDoorSecurity);
});

// Get Fuel Range
app.get('/vehicles/:id/fuel', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getEnergyService';
  await GMI.postToGMI(res, vehicle, url, callBacks.getFuel);
});

// Get Battery Range
app.get('/vehicles/:id/battery', async function(req, res) {
  const vehicle = {
    id: req.params.id,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/getEnergyService';
  await GMI.postToGMI(res, vehicle, url, callBacks.getBattery);
});

// Start|Stop Engine
app.post('/vehicles/:id/engine', async function(req, res) {
  let command = null;
  if (req.body.action === 'START') {
    command = "START_VEHICLE";
  } else if (req.body.action === 'STOP') {
    command = 'STOP_VEHICLE';
  } else {
    res.send('error, incorrect command');
    return;
  }
  const vehicle = {
    id: req.params.id,
    command: command,
    responseType: "JSON",
  };
  const url = 'http://gmapi.azurewebsites.net/actionEngineService'
  await GMI.postToGMI(res, vehicle, url , callBacks.alterEngine);
});
