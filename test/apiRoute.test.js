import chai, { expect } from 'chai';
import express from 'express';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const todos = sinon.stub().returns('TODO_ROUTER');
const apiRouter = proxyquire('../src/api/index', {
  './todos': { default: todos },
});

describe('{unit}: api/index.js (Api Router)', () => {
  let use;
  let get;
  let router;

  before(() => {
    use = sinon.stub();
    get = sinon.stub();
    router = sinon.stub(express, 'Router').returns({ use, get });
    apiRouter.default({});
  });

  after(() => router.restore());

  it('should create a new router', () =>
    expect(router.calledOnce).to.equal(true, 'expect Express.Router() to be called once'));

  it('should call router.use to set up /todos route', () => {
    const expected = ['/todos', 'TODO_ROUTER'];
    const useCallArguments = use.getCall(0).args;
    expect(useCallArguments).to.deep.equal(expected);
  });

  it('should call router.get to set up root route', () => {
    const expected = '/';
    const getCallArguments = get.getCall(0).args[0];
    expect(getCallArguments).to.deep.equal(expected);
  });
});
