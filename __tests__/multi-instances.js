'use strict';

jest.autoMockOff();

describe('multi-instances', function() {
	it('can load multi instances of the framework', function() {
		var app1 = require('./app1');
		var app2 = require('./app2');
		app1.init();
		app2.init();
		expect(app1.getText()).toBe('This is app1');
		expect(app2.getText()).toBe('This is app2');
	});
});