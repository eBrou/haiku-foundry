require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT } = require('./config/port-config.js');

const app = express();

mongoose.Promise = global.Promise;


// set up express application
app.use(bodyParser.json()); // get information from html forms
app.use(cors());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// routes
require('./app/routes.js')(app); // load routes and pass in app

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so `server` declared here
// and then assigned a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = process.env.DB_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        // console.log ('app listening on port ${port}');
        resolve();
      })
      .on('error', (error) => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

  // this function closes the server, and returns a promise.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
}

  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can
  // start the server as needed.
if (require.main === module) {
  runServer().catch((err) => { console.error(err); });
}


module.exports = { app, runServer, closeServer };
