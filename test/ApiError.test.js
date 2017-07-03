import chai, { expect } from 'chai'; // eslint-disable-line no-unused-vars
import { ApiError } from '../src/lib';

process.env.NODE_ENV = 'test';

describe('{unit}: ApiError', () => {
  const err = new ApiError({ status: 400, message: 'Error' });

  it('should be an instance of Error', () => {
    expect(err).to.be.an.instanceof(Error);
  });

  it('should have properties status and error', () => {
    expect(err).to.have.property('status');
    expect(err).to.have.property('message');
  });

  it('property status should be a number', () => {
    expect(err.status).to.be.a('number');
  });

  it('property message should be a string', () => {
    expect(err.message).to.be.a('string');
  });
});
