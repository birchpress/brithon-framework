'use strict';

(function() {
    var _ = require('lodash');
    
    var brithon = require('./brithon');

    var multimethod = require('./multimethod');
    brithon.addSubmodule(multimethod);
    
    module.exports = brithon;
}());
