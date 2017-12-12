import chai, { expect } from 'chai';
import express from 'express';
import sinon from 'sinon';
import todoRouter from '../src/api/todos';

describe('{unit}: api/todos.js', () => {
  let get;
  let post;
  let put;
  let deleteStub;
  let router;

  before(() => {
    get = sinon.stub();
    post = sinon.stub();
    put = sinon.stub();
    deleteStub = sinon.stub();
    router = sinon.stub(express, 'Router').returns({
      get, post, put, delete: deleteStub,
    });
    todoRouter({});
  });

  after(() => router.restore());

  it('should create a new router', () =>
    expect(router.calledOnce).to.equal(true, 'expect Express.Router() to be called once'));

  it('should set up route GET: /todos', () => {
    const expected = '/';
    const actual = get.getCall(0).args[0];
    expect(actual).to.equal(expected);
  });

  it('should set up route GET: /todos/:id', () => {
    const expected = '/:id';
    const actual = get.getCall(1).args[0];
    expect(actual).to.equal(expected);
  });

  it('should set up route POST: /todos', () => {
    const expected = '/';
    const actual = post.getCall(0).args[0];
    expect(actual).to.equal(expected);
  });

  it('should set up route PUT: /todos/:id', () => {
    const expected = '/:id';
    const actual = put.getCall(0).args[0];
    expect(actual).to.equal(expected);
  });

  it('should set up route DELETE: /todos/:id', () => {
    const expected = '/:id';
    const actual = deleteStub.getCall(0).args[0];
    expect(actual).to.equal(expected);
  });
});
