(function () {
    'use strict';

    angular
        .module('evolution.features.fee.contactInfo')
        .component('contactInfo', {
            controller: contactInfoCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/contact-info/contact-info.tpl.html'

        });

    contactInfoCtrl.$inject = ['$scope'];

    /* @ngInject */
    function contactInfoCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

