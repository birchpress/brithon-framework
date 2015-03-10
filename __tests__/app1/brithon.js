'use strict';

jest.autoMockOff();

//var brithon = require('brithon-framework').newInstance(); //when using npm
var brithon = require('../../index').newInstance();

describe('brithon include file', function() {

	it('should create new framework instance', function() {
		expect(brithon).toBeDefined()
	});
});

module.exports = brithon;