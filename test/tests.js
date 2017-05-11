const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('root', (() => {
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
