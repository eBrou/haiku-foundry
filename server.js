require('dotenv').config()
const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3001));



// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
    res.send('hello')
  });



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


module.exports = { app };
