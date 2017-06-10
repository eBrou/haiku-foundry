const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { Haiku } = require('../app/models/haikus.js');
const { User } = require('../app/models/user.js');
const { app, runServer, closeServer } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const seedData = [
  { userId: "123456789",
    haikuText: "looking at my desk: // paper, pen, water bottle, // and a grey laptop.",
    date:"Wed Jun 07 2017 14:47:00 GMT-0700 (PDT)",
  },
  { userId: "123456789",
    haikuText: "I want to lie on // the grass but it is cold and // I have allergies",
    date:"Wed Jun 07 2017 17:56:00 GMT-0700 (PDT)",
  },
  { userId: "123456789",
    haikuText: "Monster at the door // Just as Mummy described, yes // The monster is here",
    date:"Wed Jun 07 2017 12:10:00 GMT-0700 (PDT)",
  },
];

function seedHaikuData() {
  console.info('seeding haiku data');
  return Haiku.insertMany(seedData);
}

// this function deletes the entire database.
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//// TESTS ////
// check that landing page exists
describe('landing page', (() => {
  it('exists', (() => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.html;
      });
  }));
}));


// check that login page exists
describe('login page', (() => {
  it('exists', ((done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        // res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }));
}));

// check that home page exists
describe('home page', (() => {
  it('exists', ((done) => {
    chai.request(app)
      .get('/home')
      .end((err, res) => {
        // res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }));
}));

// check that edit page exists
describe('home page', (() => {
  it('exists', ((done) => {
    chai.request(app)
      .get('/edit')
      .end((err, res) => {
        // res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }));
}));


// API routes
// get haikus from a user
describe('Haikus API', (() => {
  // Before tests run, start up the server. use separate test db
  before(() => runServer(process.env.TEST_DATABASE_URL));

  beforeEach(() => seedHaikuData());

  afterEach(() => tearDownDb())

  // Close server after these tests run
  after(() => closeServer());

  describe('Get Endpoint', (() => {
    it('should list user haikus on GET', (() => {
      let res;
      // returns a promise
      return chai.request(app)
        .get('/api/haikus/123456789')
        .then((_res) => {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // console.log(res.body);
          res.body.should.have.length.of.at.least(1);
          return Haiku.count();
        })
        .then((count) => {
          res.body.should.have.length.of(count);
        });
    }));
    it('should return haikus with right fields', (() => {
      return chai.request(app)
      .get('/api/123456789/sessions')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach((session) => {
          session.should.be.a('object');
          session.should.include.keys(
            'user', 'date', 'location', 'timeStart', 'timeEnd', 'swell', 'wind',
            'tide', 'rating', 'notes');
        });
      });
    }));
  }));


}))
