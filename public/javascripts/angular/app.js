angular.module('app', ['ngRoute','app.controllers']).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/table', {
                templateUrl: 'partial/table.html',
                controller: 'ListController'
            })
            .when('/form', {
                templateUrl: 'partial/form.html',
                controller: 'FormController'
            })
            .when('/form/edit/:id', {
                templateUrl: 'partial/form.html',
                controller: 'FormEditController'
            })
            .when('/view/:id',{
                templateUrl: 'partial/detail.html',
                controller: 'DetailController'
            })
            .when('/content',{
                templateUrl: 'partial/content.html'
            })
            .when('/content/:id',{
                templateUrl: 'partial/content.html'
            })
            .otherwise({
                redirectTo: '/content'
            });
    }]);