(function () {
    'use strict';

    angular
        .module('evolution.features.clientAccountInfo')
        .component('clientAccountInfo', {
            controller: clientAccountInfoCtrl,
            bindings: {},
            templateUrl: 'app/features/components/client-account-info/client-account-info.tpl.html'

        });

    clientAccountInfoCtrl.$inject = ['$scope'];

    /* @ngInject */
    function clientAccountInfoCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('client-account-info');
        ////////////////

        function functionName() {

        }
    }

})();

