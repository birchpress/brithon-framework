'use strict';

(function() {
    var _ = require('lodash');
    
    var brithon = require('./brithon');

    var multimethod = require('./multimethod');
    brithon.mixin(multimethod);
    
    module.exports = brithon;
}());
