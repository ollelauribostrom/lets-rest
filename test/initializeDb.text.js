import chai, { expect } from 'chai';
import sinon from 'sinon';
import { initializeDb } from '../src/lib';

describe('{unit}: initializeDb', () => {
  const cb = sinon.stub();
  const config = {};
  initializeDb(config, cb);

  it('should execute callback once', () =>
    expect(cb.calledOnce).to.equal(true, 'expect callback to be called once'));
});
