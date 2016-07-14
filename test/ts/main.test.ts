import test from 'ava';
import TestTarget from '../../src/ts/main';

test('Successful test', t => {
    let testTarget = new TestTarget('test');
    t.is(testTarget.name, 'test');
});
