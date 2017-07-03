import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

const should = chai.should();
const agent = chai.request.agent(app);

/**
 * GET /api/todos
 */
describe('{api-endpoint}: GET /api/todos', () => {
  before((done) => {
    agent
      .post('/api/todos')
      .send({ todo: { task: 'Do laundry' } })
      .end((err, res) => {
        done();
      });
  });
  it('should get all todos', (done) => {
    agent
      .get('/api/todos')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
        done();
      });
  });
});

/**
 * POST /api/todos
 */
describe('{api-endpoint}: POST /api/todos', () => {
  it('should create a new todo', (done) => {
    agent
      .post('/api/todos')
      .send({ todo: { task: 'Wash car' } })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should return 400 if todo is missing from request', (done) => {
    agent
      .post('/api/todos')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Please provide a todo item');
        done();
      });
  });
  it('should return 400 if todo.task is missing from request', (done) => {
    agent
      .post('/api/todos')
      .send({ todo: {} })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Please provide a task for the todo item');
        done();
      });
  });
  it('POST should increase total number of todos', (done) => {
    agent
      .get('/api/todos')
      .end((err, res) => {
        expect(res.body.length).to.equal(2);
        done();
      });
  });
});

/**
 * GET /api/todos/:id
 */
describe('{api-endpoint}: GET /api/todos/:id', () => {
  it('should return todo with matching id', (done) => {
    agent
      .get('/api/todos/1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('task');
        done();
      });
  });
  it('should return 404 if no matching todo is found', (done) => {
    agent
      .get('/api/todos/3')
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Can´t find that todo');
        done();
      });
  });
});

/**
 * PUT /api/todos/:id
 */
describe('{api-endpoint}: PUT /api/todos/:id', () => {
  it('should update a todo', (done) => {
    agent
      .put('/api/todos/1')
      .send({ todo: { task: 'Cook dinner' } })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it('should not update id', (done) => {
    agent
      .put('/api/todos/1')
      .send({ todo: { task: 'Cook dinner', id: 3 } })
      .end(() => {
        agent
          .get('/api/todos/1')
          .end((err, res) => {
            expect(res.body.id).to.equal(1);
            expect(res.body.task).to.equal('Cook dinner');
            done();
          });
      });
  });
  it('should return 400 if todo is missing from request', (done) => {
    agent
      .put('/api/todos/1')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Please provide a todo item');
        done();
      });
  });
  it('should return 400 if todo.task is missing from request', (done) => {
    agent
      .put('/api/todos/1')
      .send({ todo: {} })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Please provide a task for the todo item');
        done();
      });
  });
  it('should return 404 if no matching todo is found', (done) => {
    agent
      .put('/api/todos/3')
      .send({ todo: { task: 'Cook dinner' } })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Can´t find that todo');
        done();
      });
  });
  it('PUT should result in updated todo', (done) => {
    agent
      .get('/api/todos/1')
      .end((err, res) => {
        expect(res.body.task).to.equal('Cook dinner');
        done();
      });
  });
});

/**
 * DELETE /api/todos/:id
 */
describe('{api-endpoint}: DELETE /api/todos/:id', () => {
  it('should delete a todo', (done) => {
    agent
      .delete('/api/todos/1')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it('should return 404 if no matching todo is found', (done) => {
    agent
      .delete('/api/todos/3')
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Can´t find that todo');
        done();
      });
  });
  it('DELETE should decrease total number of todos', (done) => {
    agent
      .get('/api/todos')
      .end((err, res) => {
        expect(res.body.length).to.equal(1);
        done();
      });
  });
});

