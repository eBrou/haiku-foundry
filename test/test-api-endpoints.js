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


// API routes
// get haikus from a user
describe('Haikus API', (() => {
  // Before tests run, start up the server. use separate test db
  const TEST_DATABASE_URL = 'mongodb://admin:pw1234@ds121222.mlab.com:21222/haiku-foundry-db-for-test';

  before(() => {
    return runServer(TEST_DATABASE_URL)
  });

  beforeEach(() => seedHaikuData());

  afterEach(() => tearDownDb())

  // Close server after these tests run
  after(() => {
    return closeServer()
  });

  describe('GET Endpoint', (() => {
    it('should list user haikus on GET', (() => {
      // so subsequent .then blocks can access resp obj.
      let res;
      // returns a promise
      return chai.request(app)
        .get('/api/haikus/123456789')
        .then((_res) => {

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
      // // so subsequent .then blocks can access
      let resHaiku;
      return chai.request(app)
      .get('/api/haikus/123456789')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body)
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach((haiku) => {
          haiku.should.be.a('object');
          haiku.should.include.keys(
            'userId', 'haikuText', 'date', '_id', "__v");
        });
        resHaiku = res.body[0];
        return Haiku.findById(resHaiku._id)
      })
      .then((haiku) => {
        resHaiku.userId.should.equal(haiku.userId);
        resHaiku.haikuText.should.equal(haiku.haikuText);
        resHaiku.date.should.equal(haiku.date);
      })
    }));
  }));

  describe('POST endpoint', (() => {
    // before(() => {
    //   return chai.request(app)
    //      .post('/signup')
    //        .send(testUser);
    // });

    it('should add a new haiku', (() => {
      const newHaiku = {
        userId: "123456789",
        haikuText: "A hungry monkey // rub a dub dub jumping tree // bananas for me",
        date: "Sat Jun 03 2017 18:44:32 GMT-0700 (PDT)"
      };
      return chai.request(app)
        .post('/api/haikus')
        .send(newHaiku)
        .then((res) => {
          res.should.have.status(201);
          res.should.be.json;
          // console.log(res.body)
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'userId', 'haikuText', 'date', '_id', "__v");
          res.body._id.should.not.be.null;
          res.body.userId.should.equal(newHaiku.userId);
          res.body.haikuText.should.equal(newHaiku.haikuText);
          res.body.date.should.equal(newHaiku.date);
          return Haiku.findById(res.body._id)
        })
        .then((haiku) => {
          haiku.userId.should.equal(newHaiku.userId);
          haiku.haikuText.should.equal(newHaiku.haikuText);
          haiku.date.should.equal(newHaiku.date);
        });
    }));
  }));

  describe('PUT endpoint', () => {
    it('should update haikuText and date', () => {
      const updateData = {
        haikuText: 'Cherry blossoms glow // I fall in love with living // Darkness lies behind.',
        date: 'Sat Jun 03 2017 18:45:14 GMT-0700 (PDT)'
      };
      return Haiku
        .findOne()
        .exec()
        .then((haiku) => {
          // set id in updateData to that of an existing haiku obj
          updateData._id = haiku._id;
          return chai.request(app)
            .put(`/api/haikus/${updateData._id}`)
            .send(updateData);
        })
        .then((res) => {
          res.should.have.status(204);
          // console.log(res)
          return Haiku.findById(updateData._id).exec();
        })
        .then((haiku) => {
          haiku.haikuText.should.equal(updateData.haikuText);
          haiku.date.should.equal(updateData.date);
        });
    })
  })

  describe('DELETE endpoint', () => {
    it('delete a restaurant by id', () => {
      let haiku;
      return Haiku
        .findOne()
        .exec()
        .then((_haiku) => {
          haiku = _haiku;
          return chai.request(app).delete(`/api/haikus/${haiku._id}`)
        })
        .then((res) => {
          res.should.have.status(204);
          return Haiku.findById(haiku._id).exec()
        })
        .then((_haiku) => should.not.exist(_haiku))
    })
  })


}))
