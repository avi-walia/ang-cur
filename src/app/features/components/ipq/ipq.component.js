(function () {
    'use strict';

    angular
        .module('evolution.features.ipq')
        .component('ipq', {
            controller: ipqCtrl,
            bindings: {},
            templateUrl: 'app/features/components/ipq/ipq.tpl.html'

        });

    ipqCtrl.$inject = ['$scope'];

    /* @ngInject */
    function ipqCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        // console.log('ipq');
        ////////////////

        function functionName() {

        }
    }

})();

