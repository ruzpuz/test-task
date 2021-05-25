import {Security} from './security.controller';
import {Method} from '../common/types/HTTP';
import assert from 'assert';
const security = Security.get();

function registerTwoRoutes() :void {
    assert.throws(() :void => {
        security.registerSecuredRoute('/api/user/:id', Method.GET);
        security.registerSecuredRoute('/api/user/:id', Method.GET);
    })
}

export default () => describe('Testing security services', () :void => {
    it('Cannot register same route twice', registerTwoRoutes);
});
