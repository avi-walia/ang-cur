
(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .component('banner', {
            controller: bannerCtrl,
            templateUrl:'app/utils/components/banner/banner.tpl.html'
        });


    /* @ngInject */

    bannerCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$translate'
    ];
    /* @ngInject */
    function bannerCtrl($rootScope, $scope, $translate) {
        var vm = this;
        //vm.errors = [];
        //vm.messages = [];
        vm.errors = [];
        vm.errorText = '';
        vm.showErrors = false;
        vm.close = close;

        function close() {
            vm.showErrors = false;
        }

        var noData = $rootScope.$on('noData', function() {
            var errorTranslationKey = 'errors.noData';
            if (vm.errors.indexOf(errorTranslationKey) < 0) {
                vm.errors.push(errorTranslationKey);
            }
            updateErrorMessages();
        });

        function updateErrorMessages() {
            vm.showErrors = true;
            vm.errorText = '';
            _.forEach(vm.errors, function(errorKey) {
                vm.errorText += $translate.instant(errorKey) + '<br/>';
            });
        }
        $scope.$on('$destroy', function() {
            if (noData) {
                noData();
            }
        });
    }

})();





