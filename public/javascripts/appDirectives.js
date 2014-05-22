/**
 * Created with IntelliJ IDEA.
 * User: alejandro
 * Date: 19/05/14
 * Time: 19:58
 */

var appDirectiveModule = angular.module('app.directives', ['app.services']);

appDirectiveModule.directive('equals', ['stringManipulation',function (strMani) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, elem, attrs, ngModel) {
            if(!ngModel) return; // do nothing if no ng-model

            //create a popover for no-match
            var popover = {content: attrs.name+'s do not match', placement:'left', trigger:'manual'};

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function() {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('equals', function (val) {
                validate();
            });

            //observe ac-popover-check attribute and re-validate on change
            attrs.$observe('acPopoverCheck', function(){
                validate();
            });

            var validate = function() {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;

                // set validity & popover
                if(val1 === val2){
                    ngModel.$setValidity('equals', true);
                    elem.popover('destroy');
                }else{
                    ngModel.$setValidity('equals', false);
                    if(strMani.toBoolean(attrs.acPopoverCheck)){
                        elem.popover(popover);
                        elem.popover('show');
                    }
                }
            };
        }
    }
}]);

appDirectiveModule.directive('acPopover', ['stringManipulation', function(strManipul){
    return{
        restrict: 'A',      //directive only applies to attribute 'aac-popover'
        require: '^form',   //get a hold of the form
        link: function(scope, elem, attrs, form){
            var popover = strManipul.toObject(attrs.acPopover); //Load popover settings
            //Fill popover settings with defaults:
            (!popover.content) && (popover.content = 'This field is required');
            (!popover.placement) && (popover.placement = 'right');
            (!popover.trigger) && (popover.trigger = 'manual');


            //watch on value and check popover on change
            scope.$watch(attrs.ngModel, function(){
                checkPopover();
            });

            //observe ac-popover-check attribute and check popover on change
            attrs.$observe('acPopoverCheck', function(){
                checkPopover();
            });

            //Change popover status
            var checkPopover = function(){
                if(form[attrs.name].$invalid && strManipul.toBoolean(attrs.acPopoverCheck) ){
                    elem.popover(popover);
                    elem.popover('show');
                }else elem.popover('destroy');
            }
        }
    }
}]);