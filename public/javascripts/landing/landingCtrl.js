/**
 * Created with IntelliJ IDEA.
 * User: alejandro
 * Date: 18/05/14
 * Time: 19:10
 */

/**
 * Created with IntelliJ IDEA.
 * User: Alejandro
 * Date: 4/29/2014
 * Time: 6:33 PM
 */

var landingCtrlModule = angular.module('app.controllers', []);

landingCtrlModule.controller('BackgroundController', ['$scope',
    function ($scope) {
        $scope.backgroundName = 'background';
        var random = Math.random();
        if(random > 0.9){
            $scope.backgroundName = 'jaces ingenuity';
            $scope.background = '/assets/images/bg/jacesingenuity_1024x768.jpg'
        }else if(random > 0.8){
            $scope.backgroundName = 'time sieve';
            $scope.background = '/assets/images/bg/TimeSieve_1280x960.jpg'
        }else if(random > 0.7){
            $scope.backgroundName = 'deathmark';
            $scope.background = '/assets/images/bg/Deathmark_1024x768.jpg'
        }else{
            $scope.backgroundName = 'ancient hellkite';
            $scope.background = '/assets/images/bg/ancienthellkite_1024x768.jpg'
        }
    }]);

landingCtrlModule.controller('LoginController', ['$scope',
    function ($scope) {
        $scope.user = "jaso"

    }]);

landingCtrlModule.controller('SignupController', ['$scope',
    function ($scope) {
        $scope.user= 'berto'
    }]);
