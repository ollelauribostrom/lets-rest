import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

const should = chai.should(); // eslint-disable-line no-unused-vars
const agent = chai.request.agent(app);

describe('{api-endpoint}: /api (root)', () => {
  it('it should respond with a message saying the API is up and running', (done) => {
    agent
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Yay, API is up and running');
        done();
      });
  });
});
