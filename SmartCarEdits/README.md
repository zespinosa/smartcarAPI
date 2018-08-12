# SmartCar Coding Challenge

Welcome to the SmartCar Coding Challenge API Response. Below you'll find everything you need to get started with this project. This project makes it easy to read, write, and interact with the GMI API using HTTP requests and follows the SmartCar Coding Challenge specifications. This API does not require an access token or authentication and is limited in its scope.    
Testing is completed using [mocha](https://mochajs.org/) and [chai](http://www.chaijs.com/). The server is written using Javascript, NodeJS, and Express.

## File Roles
### Server.js
This file contains the server for the SmartCar Coding Challenge API. All server interactions
are modularized within this file and powered by express. This file is the work horse of our API.
### GMI.js
This file contains all interactions with the GMI API. HTTP requests are made using the
node.js wrapper library [request-promise](https://github.com/request/request-promise). As of now
this file contains only a POST function, but could be expanded for future use.    
### gmiSuccess.js
This file contains functions responsible for constructing client responses after
the GMI API has been successfully called.  
### gmiFailure.js
This file contains all error checking and handling when GMI API calls fail or return incorrect response
### test.js
This file contains all unit tests written in mocha and chai.

## Install

Download all files.
```
npm install
```

## Run Server Locally
```
node server.js
```

## Run Test Script
Note, that when running the test script for the first time, some checks may fail due to Timeout errors. This is a result of running the server locally and should not be concerning.
All unit testing is completed using [mocha](https://mochajs.org/) and [chai](http://www.chaijs.com/).
```
npm test
```

# Example Usage
As of now, the only available vehicle IDs are 1234 and 1235
## Vehicle Info
# Request
```
GET /vehicles/:id
```
# Response
```
{
  "vin": '123454321',
  "color": "Forest Green",
  "doorCount": 2,
  "driveTrain": "v8",
}
```

## Security
# Request
```
GET /vehicles/:id/doors
```
# Response
```
[
  {
    "location": 'frontLeft',
    "locked": true,
  },
  {
    "location": 'frontLeft',
    "locked": true,
  }
]
```

## Fuel Range
# Request
```
GET /vehicles/:id/fuel
```
# Response
```
{
  "percent": 30
}
```

## Battery Range
# Request
```
GET /vehicles/:id/battery
```
# Response
```
{
  "percent": 50
}
```

## Start/Stop Engine
# Request
```
POST /vehicles/:id/engine
Content-Type: application/json
```
# Response
```
{
  "action": "START|STOP"
}
```

# Error Codes
### 200 successful api call
Expect correct response as specified under Example Usage
### 400 GMI Error
This happens when we are unable to access the GMI API, and may be a result of the GMI server being down or poor internet connectivity.
### 404 Bad Request
Check that your request follows the specifications under Example Usage

# Next Steps
- Host on AWS or GCP for remote usage
- Complete 17 digit vin number authentication
- Compile list of possible vehicle colors and driveTrains in order to verify GMI responses
- Implement more robust error checking
- Build Developer Dashboard
- Build frontend UI for non developer interactions
- Create authentication process through tokens/API key

# Support
For additional support or clarifications please contact zespinsa97@gmail.com
