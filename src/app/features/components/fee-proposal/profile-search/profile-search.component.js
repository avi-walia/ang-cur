(function () {
    'use strict';

    angular
        .module('evolution.features.fee.profileSearch')
        .component('profileSearch', {
            controller: profileSearchCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/profile-search/profile-search.tpl.html'

        });

    profileSearchCtrl.$inject = ['$scope'];

    /* @ngInject */
    function profileSearchCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

