'use strict';

jest.autoMockOff();

var brithon = require('./brithon');
var sameBrithon = require('../../index').getInstance('app1');

var ns = brithon.ns('app', {

	getOne: function() {
		return 'two';
	}

});

var ns = sameBrithon.ns('app', {

	init: function() {
		brithon.on('app.getText', function(text) {
			return text + 'app1';
		})
	},

	getOne: function() {
		return 'one';
	},

	getText: function() {
		return 'This is ';
	}

});

describe('Test same instance', function() {

	it('should be the same instance', function() {
		expect(ns.getOne()).toBe('one');
	});
});


module.exports = ns;