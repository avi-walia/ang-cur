(function () {
    'use strict';

    angular
        .module('evolution.features.splitProfile')
        .component('splitProfile', {
            controller: splitProfileCtrl,
            bindings: {},
            templateUrl: 'app/features/components/split-profile/split-profile.tpl.html'

        });

    splitProfileCtrl.$inject = ['$scope'];

    /* @ngInject */
    function splitProfileCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('split profile');
        ////////////////

        function functionName() {

        }
    }

})();

