require('dotenv').config();
// require('/routes.js');
// const { mockData } = require ('./client/src/mock-data.js');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const { Haiku } = require('./app/models/haikus.js');

mongoose.Promise = global.Promise;

const mockData = {
  haikus: [
    {
    id: "1111111",
    user: "1234567",
    text: "A hungry monkey / rub a dub dub jumping tree / bananas for me",
    date: "5/11/17"
    },
    {
    id: "2222222",
    user: "1234567",
    text: "Cherry blossoms glow / I fall in love with living / Darkness lies behind.",
    date: "5/10/17"
    },
    {
    id: "3333333",
    user: "1234567",
    text: "Cherry blossoms glow / I fall in love with living / Darkness lies behind.",
    date: "5/9/17"
    },
    {
    id: "4444444",
    user: "1234567",
    text: "Sitting in this seat / flying high above the clouds / I am a Greek God",
    date: "5/8/17"
    },
    {
    id: "5555555",
    user: "1234567",
    text: "Sitting in this seat / flying high above the clouds / I am a Greek God",
    date: "5/7/17"
    },
    {
    id: "6666666",
    user: "1234567",
    text: "Monster at the door / Just as Mummy described, yes / The monster is real",
    date: "5/6/17"
    },
    {
    id: "7777777",
    user: "1234567",
    text: "Monster at the door / Just as Mummy described, yes / The monster is real",
    date: "5/5/17"
    },
    {
    id: "8888888",
    user: "1234567",
    text: "I want to lie on/ The grass but it is cold and/ I have allergies",
    date: "5/4/17"
    }
  ]
}


app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/test', (req, res) => {
    // res.send('hello')
    res.json(mockData)
  })


app.get('/*', (req, res) => {
  res.sendFile('./client/public/index.html')
})


/////////////
// API routes
//
// // get haikus from user
// app.get('/api/:id', (req, res) => {
//   //
// })
//
// // save a haiku
// app.post('/api', (req, res) => {
//   // include user id in schema
// //   const haiku = req.body;
// //   haiku.user = req.user.id;
// })
//
// // edit a haiku
// app.put('/api', (req, res) => {
//   const haiku = req.body;
//   const id = haiku.id;
//   Haiku
//       .findById(id)
//       .exec()
//       .then(haiku => res.json(haiku));
//   })
//
//
// // gets haiku to populate haiku edit modal??
// // app.get('/api/:id', (req, res) => {
// //   const id = req.params.id;
// //   Haiku
// //     .findById(id)
// //     .exec()
// //     .then(haiku => res.json(session));
// // });
//
// // delete a haiku
// app.delete('/api/:id', (req, res) => {
//     Haiku
//       .findByIdAndRemove(req.params.id)
//       .exec()
//       .then(() => res.sendStatus(204))
//       .catch(() => res.status(500).json({ message: 'Internal server error' }));
//   })



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


module.exports = { app };
