require('dotenv').config();
// require('/routes.js');
const express = require('express');
const app = express();



app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
    res.send('hello')
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
