'use strict';

jest.autoMockOff();

var brithon = require('./brithon');

var ns = brithon.ns('app', {

	init: function() {
		brithon.on('app.getText', function(text) {
			return text + 'app1';
		})
	},

	getText: function() {
		return 'This is ';
	}

});

module.exports = ns;