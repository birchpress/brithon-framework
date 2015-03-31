'use strict';

jest.autoMockOff();

var brithon = require('../index').newInstance();

describe('namespace', function() {
	it('can define object tree in brithon', function() {

		var ns1 = brithon.ns('a.b.c', {
			getDog: function() {
				return 'dog';
			}
		});

		var ns2 = brithon.ns('a.b', {
			getCat: function() {
				return 'cat';
			}
		});

		var ns3 = brithon.ns('d', {
			getCar: function() {
				return 'car';
			}
		});

		expect(brithon.a.b.c.getDog.fn).toBeDefined();
		expect(ns1.getDog.fn).toBeDefined();
		expect(brithon.a.b.getCat.fn).toBeDefined();
		expect(brithon.a.b.c.getDog()).toBe('dog');
		expect(brithon.a.b.getCat()).toBe('cat');
		expect(brithon.d.getCar()).toBe('car');
		expect(ns1.getDog()).toBe('dog');
	});
});