import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

const request = chai.request(app);
const should = chai.should();

async function expectError(req) {
  return req.then(res => res).catch(err => err.response);
}

/**
 * GET /api/todos
 */
describe('{api-endpoint}: GET /api/todos', () => {
  let response;

  before(async () => {
    await request
      .post('/api/todos')
      .send({ todo: { task: 'Do laundry' } });

    response = await request.get('/api/todos');
  });

  it('should respond with 200', () => response.should.have.status(200));
  it('should respond with an array ', () => expect(response.body).to.be.an('array'));
  it('should contain one todo item ', () => expect(response.body.length).to.equal(1));
});

/**
 * POST /api/todos
 */
describe('{api-endpoint}: POST /api/todos', () => {
  let okResponse;
  let missingTodoResponse;
  let missingTaskResponse;

  before(async () => {
    const todoItem = { todo: { task: 'Wash car' } };
    okResponse = await request.post('/api/todos').send(todoItem);
    missingTodoResponse = await expectError(request.post('/api/todos').send({}));
    missingTaskResponse = await expectError(request.post('/api/todos').send({ todo: {} }));
  });

  it('sucessful POST should return 201', () => okResponse.should.have.status(201));

  it('sucessful POST should result in a new todo', async () => {
    const { body } = await request.get('/api/todos');
    return expect(body.length).to.equal(2);
  });

  it('invalid POST should return an error message (missing todo)', () => {
    const { body } = missingTodoResponse;
    return expect(body.message).to.equal('Please provide a todo item');
  });

  it('invalid POST should return 400 (missing todo)', () =>
    missingTodoResponse.should.have.status(400));

  it('invalid POST should return an error message (missing todo.task)', () => {
    const { body } = missingTaskResponse;
    expect(body.message).to.equal('Please provide a task for the todo item');
  });

  it('invalid POST should return 400 (missing todo.task)', () =>
    missingTaskResponse.should.have.status(400));
});

/**
 * GET /api/todos/:id
 */
describe('{api-endpoint}: GET /api/todos/:id', () => {
  let okResponse;
  let badResponse;

  before(async () => {
    okResponse = await request.get('/api/todos/1');
    badResponse = await expectError(request.get('/api/todos/3'));
  });

  it('successful GET should return 200', () => okResponse.should.have.status(200));

  it('successful GET should return a todo item', () => {
    const { body } = okResponse;
    return expect(body).to.have.all.keys('id', 'task');
  });

  it('failed GET should return 404', () => badResponse.should.have.status(404));

  it('failed GET should return an error message', () => {
    const { body } = badResponse;
    return expect(body.message).to.equal('Can´t find that todo');
  });
});

/**
 * PUT /api/todos/:id
 */
describe('{api-endpoint}: PUT /api/todos/:id', () => {
  let okResponse;
  let missingTodoResponse;
  let missingTaskResponse;
  let notFoundResponse;

  before(async () => {
    const todoItem = { todo: { task: 'Cook dinner' } };
    okResponse = await request.put('/api/todos/1').send(todoItem);
    missingTodoResponse = await expectError(request.put('/api/todos/1').send({}));
    missingTaskResponse = await expectError(request.put('/api/todos/1').send({ todo: {} }));
    notFoundResponse = await expectError(request.put('/api/todos/999').send(todoItem));
  });

  it('sucessful PUT should return 204', () => okResponse.should.have.status(204));

  it('sucessful PUT should result in a updated todo', async () => {
    const { body } = await request.get('/api/todos/1');
    return expect(body.task).to.equal('Cook dinner');
  });

  it('PUT should not update id', async () => {
    await request.put('/api/todos/1').send({ todo: { task: 'Cook dinner', id: 3 } });
    const { body } = await request.get('/api/todos/1');
    return expect(body).to.deep.equal({ id: 1, task: 'Cook dinner' });
  });

  it('invalid PUT should return 400 (missing todo)', () =>
    missingTodoResponse.should.have.status(400));

  it('invalid PUT should return an error message (missing todo)', () => {
    const { body } = missingTodoResponse;
    return expect(body.message).to.equal('Please provide a todo item');
  });

  it('invalid PUT should return 400 (missing todo.task)', () =>
    missingTaskResponse.should.have.status(400));

  it('invalid PUT should return an error message (missing todo.task)', () => {
    const { body } = missingTaskResponse;
    expect(body.message).to.equal('Please provide a task for the todo item');
  });

  it('should return 404 if no matching todo is found', () =>
    notFoundResponse.should.have.status(404));

  it('should return an error message if no matching todo is found', () => {
    const { body } = notFoundResponse;
    return expect(body.message).to.equal('Can´t find that todo');
  });
});

/**
 * DELETE /api/todos/:id
 */
describe('{api-endpoint}: DELETE /api/todos/:id', () => {
  let okResponse;
  let badResponse;

  before(async () => {
    okResponse = await request.delete('/api/todos/1');
    badResponse = await expectError(request.delete('/api/todos/999'));
  });

  it('sucessful DELETE should return 204', () => okResponse.should.have.status(204));

  it('sucessful DELETE should decrease total number of todos', async () => {
    const { body } = await request.get('/api/todos');
    return expect(body).to.have.lengthOf(1);
  });

  it('should return 404 if no matching todo is found', () =>
    badResponse.should.have.status(404));

  it('should return an error message if no matching todo is found', () => {
    const { body } = badResponse;
    return expect(body.message).to.equal('Can´t find that todo');
  });
});

