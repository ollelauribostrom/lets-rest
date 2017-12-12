import chai, { expect } from 'chai';
import { ApiError } from '../src/lib';

describe('{unit}: ApiError', () => {
  const err = new ApiError({ status: 400, message: 'Error' });

  it('should have property message', () => expect(err).to.have.property('message', 'Error'));
  it('should have property status', () => expect(err).to.have.property('status', 400));
  it('should be an instance of Error', () => expect(err).to.be.an.instanceof(Error));
  it('property status should be a number', () => expect(err.status).to.be.a('number'));
  it('property message should be a string', () => expect(err.message).to.be.a('string'));
});
