//
// (c) 2011 Kris Jordan
//
// `multimethod` is freely distributable under the MIT license.
// For details and documentation: 
// [http://krisjordan.com/multimethod-js](http://krisjordan.com/multimethod-js)

// (c) 2015 Brithon Inc.

(function() {

    var _ = require('lodash');

    var noop = function() {};

    var identity = function(a) { return a; };

    var match = function(value, methods) {
        if(_.has(methods, value)) {
            return methods[value];
        } else {
            return false;
        }
    };

    var pluck = function(property) {
        return function(object) {
            return object[property];
        }
    };


    var multimethod = function(dispatch) { 

        var _dispatch,
            _methods   = {},
            _default   = noop;

        var _lookup    = function() {
            var criteria    = _dispatch.apply(that, arguments),
                method      = match(criteria, _methods);
            if(method !== false) {
                return method;
            } else {
                return _default;
            }
        };

        var toValue = function(subject, args) {
            if(_.isFunction(subject)) {
                return subject.apply(that, args);
            } else {
                return subject;
            }
        };

        var that = function() {
            var method = _lookup.apply(that, arguments);
            return toValue.call(that, method, arguments);
        };

        that['dispatch'] = function(dispatch) {
            if(_.isFunction(dispatch)) {
                _dispatch = dispatch;
            } else if(_.isString(dispatch)) {
                _dispatch = pluck(dispatch);
            } else {
                throw "dispatch requires a function or a string.";
            }
            return that;
        };

        that.dispatch(dispatch || identity);

        that['when'] = function(matchValue, fn) {
            _methods[matchValue] = fn;
            return that;
        };

        that['remove'] = function(matchValue) {
            if(_.has(_methods, matchValue)) {
                delete _methods[matchValue];
            }
            return that;
        };

        that['setDefault'] = function(method) {
            _default = method;
            Object.defineProperty(that, 'default', {
                value: _default,
                writable: false
            });

            return that;
        };

        return that;
    };

    module.exports = multimethod;

}());
