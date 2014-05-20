/**
 * Created with IntelliJ IDEA.
 * User: alejandro
 * Date: 18/05/14
 * Time: 22:39
 */

var landingCtrlApp = angular.module('LandingApp', ['ngRoute', 'app.controllers', 'app.directives']);

landingCtrlApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'log-in.html',
                controller: 'LoginController'
            })
            .when('/signup', {
                templateUrl: 'sign-up.html',
                controller: 'SignupController'
            })
            .otherwise({
                redirectTo: ''
            });
    }]);
