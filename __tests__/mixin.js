'use strict';

jest.autoMockOff();

var brithon = require('../index').newInstance();

describe('namespace', function() {
	it('can mixin submodules', function() {
		expect(brithon.multimethod).toBeDefined();
	});
});