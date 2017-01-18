(function () {
    'use strict';

    angular
        .module('evolution.features.fundCustomization')
        .component('fundCustomization', {
            controller: fundCustomizationCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fund-customization/fund-customization.tpl.html'

        });

    fundCustomizationCtrl.$inject = ['$scope'];

    /* @ngInject */
    function fundCustomizationCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('fund-customization');
        ////////////////

        function functionName() {

        }
    }

})();

