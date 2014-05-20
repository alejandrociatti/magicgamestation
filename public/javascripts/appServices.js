/**
 * Created with IntelliJ IDEA.
 * User: alejandro
 * Date: 20/05/14
 * Time: 16:14
 */

angular.module('app.services', []).factory('stringManipulation', function() {
    return {
        toObject: function(objectString) {
            var parts = objectString.split(',');
            var obj = {};
            i = parts.length;
            while(i--){
                var kv = parts[i].split(':');
                obj[kv[0]] = kv[1];
            }
            return obj;
        },
        toBoolean: function(booleanString){
            var bool = booleanString.toLowerCase();
            if(bool == 'true') return true;
            else if(bool == 'false') return false;
            else return undefined;
        }
    };
});