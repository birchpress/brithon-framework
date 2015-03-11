'use strict';

(function() {
    var _ = require('lodash');

    var _submodules = {};

    var newInstance = function() {
        var _fnMap = {};

        var _assert = function(assertion, message) {
            if (!assertion) {
                throw new Error(message);
            }
        };

        var defineNs = function(nsName, obj) {
            var ns = {
                getNsName: function() {
                    return nsName;
                }
            };
            _.forOwn(obj, function(value, key) {
                if (_.isFunction(value)) {
                    ns[key] = defn(ns, key, value);
                }
            });
            return ns;
        };

        var argumentsToArray = function(args) {
            return Array.prototype.slice.call(args);
        };

        var applyListeners = function() {
            var args = argumentsToArray(arguments);
            _assert(args.length >= 2, 'At least two arguments are required. The arguments are ' + args);
            _assert(_.isString(args[0]), 'The hook name should be string.');

            var context = this;
            var eventName = args[0];
            var value = args[1];
            if (_.has(_fnMap, eventName)) {
                var listeners = _fnMap[eventName];
                if (_.isArray(listeners)) {
                    _.each(listeners, function(priorityListeners, priority) {
                        if (_.isArray(priorityListeners)) {
                            _.each(priorityListeners, function(fn, index) {
                                var fnArgs = args.slice(2);
                                fnArgs.unshift(value);
                                var return_val = fn.apply(context, fnArgs);
                                if (return_val !== undefined) {
                                    value = return_val;
                                }
                            });
                        }
                    });
                }
            }
            return value;
        };

        var defn = function(ns, fnName, fn) {
            _assert(_.isObject(ns) && _.has(ns, 'getNsName'), 'The namespace(1st argument) should be a namespace object.');
            _assert(_.isString(fnName), 'The function name(2nd argument) should be a string.');
            _assert(_.isFunction(fn), 'The 3rd argument should be a function');

            var eventName = ns.getNsName() + '.' + fnName;
            var preEventName = eventName + '-pre';
            var hookable = function() {
                var args = argumentsToArray(arguments);

                var preArgs = [];
                preArgs.unshift(preEventName, args);
                args = applyListeners.apply(ns, preArgs);

                var result = fn.apply(ns, args);

                var fArgs = args.slice(0);
                fArgs.unshift(eventName, result);
                result = applyListeners.apply(ns, fArgs);

                return result;
            };
            Object.defineProperty(hookable, 'fn', {
                value: fn,
                writable: false
            });

            return hookable;
        };

        var parsePriority = function(arg) {
            arg = parseInt(arg);
            if (_.isNaN(arg) || arg < 0) {
                arg = 10;
            }
            return arg;
        };

        var addListener = function(eventName, fn, priority) {
            _assert(_.isString(eventName), 'The hook name should be a string.');
            _assert(_.isFunction(fn), 'The listener should be a function');

            priority = parsePriority(priority);
            if (_.has(_fnMap, eventName)) {
                var listeners = _fnMap[eventName];
                if (_.isArray(listeners) && _.isArray(listeners[priority])) {
                    listeners[priority].push(fn);
                } else {
                    listeners = [];
                    listeners[priority] = [fn];
                }
            } else {
                _fnMap[eventName] = [];
                _fnMap[eventName][priority] = [fn];
            }
        };

        var removeListener = function(eventName, fn, priority) {
            _assert(_.isString(eventName), 'The hook name should be a string.');
            _assert(_.isFunction(fn), 'The listener should be a function');

            priority = parsePriority(priority);
            if (_.has(_fnMap, eventName)) {
                var listeners = _fnMap[eventName];
                if (_.isArray(listeners) && _.isArray(listeners[priority])) {
                    _.without(listeners[priority], fn);
                }
            }
        };

        var exports = {
            on: addListener,
            addListener: addListener,
            removeListener: removeListener,
            ns: defineNs,
            assert: _assert
        };

        exports = _.merge(exports, _submodules);

        return exports;
    };

    var mixin = function(submodule) {
        _submodules = _.merge(_submodules, submodule);
    }


    module.exports = {
        newInstance: newInstance,
        mixin: mixin
    }
}());