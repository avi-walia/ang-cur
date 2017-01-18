(function () {
    'use strict';

    angular
        .module('evolution.features.profileSummary')
        .component('profileSummary', {
            controller: profileSummaryCtrl,
            bindings: {},
            templateUrl: 'app/features/components/profile-summary/profile-summary.tpl.html'

        });

    profileSummaryCtrl.$inject = ['$scope'];

    /* @ngInject */
    function profileSummaryCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('profile-summary');
        ////////////////

        function functionName() {

        }
    }

})();

