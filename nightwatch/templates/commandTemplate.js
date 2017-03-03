'use strict';

exports.command = function (variable1, variable2, variableN, callback) {    
    var self = this;
    
    self.perform(
        function () {
            // Function Here
        },
        
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        }
    );
    return self;
};
