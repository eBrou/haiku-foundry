const { Haiku } = require('./models/haikus.js');


module.exports = function (app) {
  // API routes

  // get haikus from user
  app.get('/api/haikus/:userId', (req, res) => {
    const userId = req.params.userId
    Haiku
      .find({ userId: userId })
      .sort({ date: -1 })
      .then((haikus) => {
        res.json(haikus)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


  // save a haiku
  app.post('/api/haikus', (req, res) => {
    Haiku
      .create({
        userId: req.body.userId,
        haikuText: req.body.haikuText,
        date: req.body.date,
      })
      .then(haiku => res.status(201).json(haiku))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  // edit a haiku
  app.put('/api/haikus/:id', (req, res) => {
    const haiku = req.body.haikuText;
    const date = req.body.date;
    const id = req.params.id;
    Haiku
      .findByIdAndUpdate(id, { haikuText: haiku, date: date })
      .exec()
      .then(() => res.status(204).end())
      .catch(() => res.status(500).json({message: 'Internal server error'}));
    });

  // delete a haiku
  app.delete('/api/haikus/:id', (req, res) => {
    Haiku
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => res.sendStatus(204))
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  });
};
