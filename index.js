'use strict';

(function() {
    var _ = require('lodash');
    
    var namespace = require('./namespace');
    var multimethod = require('./multimethod');
    
    module.exports = _.merge(namespace, multimethod);
}());
