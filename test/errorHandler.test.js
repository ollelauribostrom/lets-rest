import chai, { expect } from 'chai';
import express from 'express';
import sinon from 'sinon';
import { errorHandler } from '../src/middleware';

describe('{unit}: api/todos.js', () => {
  const req = sinon.stub();
  const next = sinon.stub();
  let res;
  let status;
  let json;

  beforeEach(() => {
    json = sinon.stub();
    status = sinon.stub().returns({ json });
    res = { status };
  });

  it('should call res.status with destructured error status', () => {
    const err = { status: 400, message: 'err' };
    errorHandler(err, req, res, next);
    const actual = status.getCall(0).args[0];
    expect(actual).to.equal(400);
  });

  it('should call res.json with destructured error message', () => {
    const err = { status: 400, message: 'err' };
    errorHandler(err, req, res, next);
    const actual = json.getCall(0).args[0];
    expect(actual).to.deep.equal({ message: 'err' });
  });

  it('should use default status if none is provied', () => {
    const err = {};
    errorHandler(err, req, res, next);
    const actual = status.getCall(0).args[0];
    expect(actual).to.equal(500);
  });

  it('should use default message if none is provided', () => {
    const err = {};
    errorHandler(err, req, res, next);
    const actual = json.getCall(0).args[0];
    expect(actual).to.deep.equal({ message: 'Something went wrong!' });
  });
});
