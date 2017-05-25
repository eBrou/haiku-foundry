require('dotenv').config();
// require('/routes.js');
// const { mockData } = require ('./client/src/mock-data.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const { Haiku } = require('./app/models/haikus.js');
const { User } = require('./app/models/user.js');
const { PORT } = require('./config/port-config.js');


mongoose.Promise = global.Promise;

// const mockData = {
//   haikus: [
//     {
//     id: "1111111",
//     user: "1234567",
//     text: "A hungry monkey / rub a dub dub jumping tree / bananas for me",
//     date: "5/11/17"
//     },
//     {
//     id: "2222222",
//     user: "1234567",
//     text: "Cherry blossoms glow / I fall in love with living / Darkness lies behind.",
//     date: "5/10/17"
//     },
//     {
//     id: "3333333",
//     user: "1234567",
//     text: "Cherry blossoms glow / I fall in love with living / Darkness lies behind.",
//     date: "5/9/17"
//     },
//     {
//     id: "4444444",
//     user: "1234567",
//     text: "Sitting in this seat / flying high above the clouds / I am a Greek God",
//     date: "5/8/17"
//     },
//     {
//     id: "5555555",
//     user: "1234567",
//     text: "Sitting in this seat / flying high above the clouds / I am a Greek God",
//     date: "5/7/17"
//     },
//     {
//     id: "6666666",
//     user: "1234567",
//     text: "Monster at the door / Just as Mummy described, yes / The monster is real",
//     date: "5/6/17"
//     },
//     {
//     id: "7777777",
//     user: "1234567",
//     text: "Monster at the door / Just as Mummy described, yes / The monster is real",
//     date: "5/5/17"
//     },
//     {
//     id: "8888888",
//     user: "1234567",
//     text: "I want to lie on/ The grass but it is cold and/ I have allergies",
//     date: "5/4/17"
//     }
//   ]
// }
//
//// before adding runServer & closeServer
// app.set('port', (process.env.PORT || 3001));

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

// required for passport
// app.use(session({
//   secret: 'cookie_secret',
//   resave: true,
//   saveUninitialized: true,
// })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// routes
require('./app/routes.js')(app); // load routes and pass in app


// before adding runServer & closeServer
// app.listen(app.get('port'), () => {
//   console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
// });

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
        console.log("app listening on port " + port);
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


module.exports = { app };
