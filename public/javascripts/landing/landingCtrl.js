/**
 * Created with IntelliJ IDEA.
 * User: alejandro
 * Date: 18/05/14
 * Time: 19:10
 */

var landingCtrlModule = angular.module('app.controllers', ['app.services']);

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
        $scope.send = function(){
            //TODO: check form validity & send form
        }
    }]);

landingCtrlModule.controller('SignupController', ['$scope',
    function ($scope) {
        $scope.sent = false;
        $scope.emailTaken = false;
        $scope.userTaken = false;

        $scope.submit = function(){
            $scope.sent = true;
            if($scope.signupform.$valid){
                jsRoutes.controllers.Users.create().ajax({
                    method: 'POST',
                    data: $scope.user,
                    responseType: 'application/json',
                    success: function(data){
                        console.log(data);
                        if(data.status == 'OK'){
                            alert('success!');
                        }else {
                            if (data.msg == 'email') {
                                $scope.emailTaken = true;
                            }
                            if(data.msg == 'username'){
                                $scope.userTaken = true;
                            }
                            $scope.$apply();
                        }
                    },
                    error: function(data){
                        console.log(data);
                    }

                });
            }
        }
    }]);
