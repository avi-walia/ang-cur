(function () {
    'use strict';

    angular
        .module('evolution.features.help')
        .component('help', {
            controller: helpCtrl,
            bindings: {},
            templateUrl: 'app/features/components/help/help.tpl.html'

        });

    helpCtrl.$inject = ['$scope'];

    /* @ngInject */
    function helpCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('helpCtrl');
        ////////////////

        function functionName() {

        }
    }

})();

