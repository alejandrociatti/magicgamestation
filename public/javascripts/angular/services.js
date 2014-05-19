/**
 * Created with IntelliJ IDEA.
 * User: Alejandro
 * Date: 4/30/2014
 * Time: 4:29 PM
 */

angular.module('app.services', []).factory('dataAccess', function($http) {
    var url = 'http://dpoi2012api.appspot.com/api/1.0/';
    var config = {params: {credential: 'aciatti'} };
    return {
        getList: function(successHandler, errorHandler) {
            $http.get(url+'list', config).success(function(data){
                successHandler && successHandler(data);
            }).error(function(){
                errorHandler && errorHandler();
            });
        },
        getElement: function(id, successHandler, errorHandler){
            config.params.id = id;
            $http.get(url+'view', config).success(function(data){
                successHandler && successHandler(data);
                config.params.id = undefined;
            }).error(function(){
                errorHandler && errorHandler();
                config.params.id = undefined;
            });
        },
        createElement: function (element, successHandler, errorHandler){
            var newConfig = {params: element};
            newConfig.params.credential = config.params.credential;
            $http.get(url+'create', newConfig).success(function(data){
                successHandler && successHandler(data);
            }).error(function () {
                errorHandler && errorHandler();
            });
        },
        updateElement: function (element, successHandler, errorHandler) {
            var newConfig = {params: element};
            newConfig.params.credential = config.params.credential;
            $http.get(url+'update', newConfig).success(function(data){
                successHandler && successHandler(data);
            }).error(function(){
                errorHandler && errorHandler();
            });
        },
        deleteElement: function (id, successHandler, errorHandler) {
            config.params.id = id;
            $http.get(url+'delete', config).success(function(data){
                successHandler && successHandler(data);
                config.params.id = undefined;
            }).error(function(){
                errorHandler && errorHandler();
                config.params.id = undefined;
            });
        }
    };
});
