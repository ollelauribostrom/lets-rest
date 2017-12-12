import chai, { expect } from 'chai';
import fs from 'fs';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const rfs = sinon.stub();
const logger = proxyquire('../src/middleware/logger', {
  'rotating-file-stream': rfs,
});

describe('{unit}: logger.js', () => {
  let existsSync;
  let mkdirSync;

  before(() => {
    existsSync = sinon.stub(fs, 'existsSync').returns(true);
    existsSync.withArgs('./src').returns(false);
    mkdirSync = sinon.stub(fs, 'mkdirSync');
  });

  after(() => {
    existsSync.restore();
    mkdirSync.restore();
  });

  it('should check if provided logDirectory exists', () => {
    logger.getLogStream('./test');
    return expect(existsSync.calledOnce).to.equal(true, 'should call fs.existsSync once');
  });

  it('should create path if provided logDirectory does not exists', () => {
    logger.getLogStream('./src');
    return expect(mkdirSync.calledOnce).to.equal(true, 'should call fs.mkdirSync once');
  });

  it('should create and return a new rfs (rotating file stream)', () => {
    logger.getLogStream('./test');
    return expect(rfs.calledThrice).to.equal(true, 'should call rfs on each call to getLogStream');
  });
});
