(function () {
    'use strict';

    angular
        .module('evolution.features.advisorInfo')
        .component('advisorInfo', {
            controller: advisorInfoCtrl,
            bindings: {},
            templateUrl: 'app/features/components/advisor-info/advisor-info.tpl.html'

        });

    advisorInfoCtrl.$inject = ['$scope'];

    /* @ngInject */
    function advisorInfoCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('adivosr info');
        ////////////////

        function functionName() {

        }
    }

})();

