/**
 * Created with IntelliJ IDEA.
 * User: Alejandro
 * Date: 4/29/2014
 * Time: 6:33 PM
 */

var appCtrlModule = angular.module('app.controllers', ['app.services']);

appCtrlModule.controller('ListController', ['$scope', '$window', '$location', 'dataAccess',
    function ($scope, $window, $location, dataAccess) {
        $scope.wait = '';
        $scope.goToForm = function(){
            $location.path('/form');
        };
        $scope.deleteEl = function(id){
            dataAccess.deleteElement(id, function(data){
                $window.location.reload();
            });
        };
        $scope.img = {
            view: 'img/calendar.png',
            edit: 'img/pencil.png',
            delete: 'img/trash.png'
        };
        dataAccess.getList(function(data){
            $scope.items = data.payload.items;
            $scope.wait = 'hidden';
        });
    }]);

appCtrlModule.controller('FormController', ['$scope', '$location', 'dataAccess', function($scope, $location, dataAccess){
    $scope.send = function(){
        dataAccess.createElement($scope.e, function (data) {
            $location.path('/table');
        });
    };
}]);

appCtrlModule.controller('FormEditController', ['$scope', '$routeParams', '$location','dataAccess',
    function($scope, $routeParams, $location, dataAccess){
    $scope.e = {id: $routeParams.id};
    dataAccess.getElement($routeParams.id, function(data){
            $scope.e.firstname = data.payload.firstname;
            $scope.e.lastname = data.payload.lastname;
            $scope.e.mail= data.payload.mail;
            $scope.e.phone= data.payload.phone;
            $scope.e.street = data.payload.street;
            $scope.e.province = data.payload.province;
            $scope.e.postalcode = data.payload.postalcode;
            $scope.e.birthdate = data.payload.birthdate;
            $scope.e.civilstate = data.payload.civilstate;
            $scope.e.about = data.payload.about;
    });
    $scope.send = function(){
        dataAccess.updateElement($scope.e, function(data){
            $location.path('/table');
        });
    };
    $scope.cancel = function () {
        $location.path('/table');
    };
}]);

appCtrlModule.controller('DetailController', ['$scope', '$routeParams', '$location', 'dataAccess',
    function($scope, $routeParams, $location, dataAccess){
        $scope.e = {id: $routeParams.id};
        $scope.goToTable = function(){
            $location.path('/table');
        };
        dataAccess.getElement($scope.e.id, function (data) {
            $scope.e.firstname = data.payload.firstname;
            $scope.e.lastname = data.payload.lastname;
            $scope.e.mail= data.payload.mail;
            $scope.e.phone= data.payload.phone;
            $scope.e.street = data.payload.street;
            $scope.e.province = data.payload.province;
            $scope.e.postalcode = data.payload.postalcode;
            $scope.e.birthdate = data.payload.birthdate;
            $scope.e.civilstate = data.payload.civilstate;
            $scope.e.about = data.payload.about;
        })
}]);