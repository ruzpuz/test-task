import * as service from './index';
import assert from 'assert';

function generatedUUID() :void {
  const tries = Math.floor(Math.random() * 10) + 1;
  for(let i = 0; i < tries; i += 1) {
    assert(service.isUUID(service.generateUUID()));
  }
}

export default () => describe('Testing services for validation of UUID', () :void => {
  it('Generated UUID should be valid', generatedUUID);
});
