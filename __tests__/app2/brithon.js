'use strict';

jest.autoMockOff();

var brithon = require('../../index').getInstance('app2');

describe('brithon include file', function() {

	it('should create new framework instance', function() {
		expect(brithon).toBeDefined()
	});
});

module.exports = brithon;