// const { app } = require('../server.js');
const { Haiku } = require('./models/haikus.js');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { return next(); }
    // if they aren't redirect them to the home page
  return res.redirect('/');
}


module.exports = function (app) {
  // app.get('/api/test', (req, res) => {
  //
  //     // res.send('hello')
  //     // res.json(mockData)
  //   Haiku
  //     .find()
  //     .limit(10)
  //     .exec()
  //     .then( haikus => res.json(haikus))
  //   .catch(
  //       err => {
  //         console.error(err);
  //         res.status(500).json({message: 'Internal server error'});
  //     });
  // })


  // app.get('/*', (req, res) => {
  //   res.sendFile('client/public/index.html')
  // })


  /////////////
  // API routes

  // get haikus from user
  app.get('/api/haikus/:userId', (req, res) => {
    console.log('hello', 'userId is ' + req.params.userId)
    const userId = req.params.userId
    Haiku
      .find({ userId: userId })
      .sort({ date: -1 })
      // .exec()
      .then((haikus) => {
        // console.log(haikus);
        res.json(haikus)
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
  })


  // save a haiku
  app.post('/api/haikus', (req, res) => {
    //??
  //   haiku.user = req.user.id;
    // console.log(req.body)
    Haiku
      .create({
        userId: req.body.userId,
        haikuText: req.body.haikuText,
        date: req.body.date
      })
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
  })

  // edit a haiku
  app.put('/api/haikus/:id', (req, res) => {
    const haiku = req.body.haikuText;
    const date = req.body.date
    const id = req.params.id;
    Haiku
        .findByIdAndUpdate(id, { haikuText: haiku, date: date })
        .exec()
        .then(() => res.sendStatus(204))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
    })

  // delete a haiku
  app.delete('/api/haikus/:id', (req, res) => {
      Haiku
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => res.sendStatus(204))
        .catch(() => res.status(500).json({ message: 'Internal server error' }));
    })
}
