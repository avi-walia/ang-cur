(function () {
    'use strict';

    angular
        .module('evolution.features.reports')
        .component('reports', {
            controller: reportsCtrl,
            bindings: {},
            templateUrl: 'app/features/components/reports/reports.tpl.html'

        });

    reportsCtrl.$inject = ['$scope'];

    /* @ngInject */
    function reportsCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('reports');
        ////////////////

        function functionName() {

        }
    }

})();

